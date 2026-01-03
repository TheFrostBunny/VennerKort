"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { account, databases, DATABASE_ID, COLLECTION_ID_USERS } from './client';
import { Models, ID } from 'appwrite';
import { useTheme } from 'next-themes';
import { useI18n } from '../i18n/i18n-context';

interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    checkSession: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);

    const { theme, setTheme } = useTheme();
    const { lang, setLang } = useI18n();

    const checkSession = async () => {
        try {
            const current = await account.get();
            setUser(current);

            // Load user preferences from database
            try {
                const profile = await databases.getDocument(
                    DATABASE_ID,
                    COLLECTION_ID_USERS,
                    current.$id
                );

                if (profile.preferredLanguage && profile.preferredLanguage !== lang) {
                    setLang(profile.preferredLanguage);
                }
                if (profile.themePreference && profile.themePreference !== theme) {
                    setTheme(profile.themePreference);
                }
            } catch (profileError) {
                console.warn("Could not load user profile preferences", profileError);
            }

        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Sync local changes to Appwrite
    useEffect(() => {
        if (!user || loading) return;

        const updatePreferences = async () => {
            try {
                await databases.updateDocument(
                    DATABASE_ID,
                    COLLECTION_ID_USERS,
                    user.$id,
                    {
                        preferredLanguage: lang,
                        themePreference: theme
                    }
                );
            } catch (error) {
                // Silent fail or low-priority log - expected if fields missing in schema
                console.warn("Failed to sync preferences to cloud", error);
            }
        };

        // Debounce could be good here, but for now strict effect is okay
        const timeoutId = setTimeout(updatePreferences, 1000); // 1s delay to avoid rapid writes
        return () => clearTimeout(timeoutId);

    }, [lang, theme, user, loading]);

    useEffect(() => {
        checkSession();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await account.createEmailPasswordSession(email, password);
             // Update lastLogin
             try {
                const user = await account.get();
                // We need to find the user profile document to update it.
                // Since we used user.$id as document ID, we can try that.
                await databases.updateDocument(
                    DATABASE_ID,
                    COLLECTION_ID_USERS,
                    user.$id,
                    {
                        lastLogin: new Date().toISOString()
                    }
                );
             } catch (e: any) {
                 console.error("Failed to update lastLogin", e);
                 // We simply ignore the error if updating lastLogin fails, 
                 // prioritizing successful login over accurate stats.
             }
            await checkSession();
        } catch (error) {
             setLoading(false);
             throw error;
        }
    };

    const register = async (email: string, password: string, name: string) => {
        setLoading(true);
        try {
            const newUser = await account.create(ID.unique(), email, password, name);
            await login(email, password);

            // Create User Profile in Database
            try {
                await databases.createDocument(
                    DATABASE_ID,
                    COLLECTION_ID_USERS,
                    newUser.$id, // Use Auth ID as Document ID
                    {
                        username: name,
                        email: email,
                        createdDate: new Date().toISOString(),
                        isActive: true,
                        // Generating a random integer for userId since schema requires integer. 
                        // ideally this should be handled by backend/function if uniqueness is critical beyond probability.
                        userId: Math.floor(Math.random() * 100000000),
                        preferredLanguage: lang, // Save initial preferences
                        themePreference: theme
                    }
                );
            } catch (dbError: any) {
                // Ignore if document already exists (error 409), as login() might have created it via recovery logic
                if (dbError.code !== 409) {
                    console.error("Failed to create user profile in database:", dbError);
                }
            }
        } catch (error) {
             setLoading(false);
             throw error;
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkSession }}>
            {children}
        </AuthContext.Provider>
    );
};
