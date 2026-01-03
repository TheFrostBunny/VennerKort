"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from './translations';

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('nb');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('happysend_lang') as Language;
    if (savedLang && (savedLang === 'nb' || savedLang === 'en')) {
      setLang(savedLang);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('happysend_lang', newLang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let value: any = translations[lang];
    
    for (const key of keys) {
      if (value[key] === undefined) {
        // Fallback to Norwegian if key not found in current language
        value = translations['nb'];
        for (const fallbackKey of keys) {
            value = value[fallbackKey] || path;
        }
        return value;
      }
      value = value[key];
    }
    
    return typeof value === 'string' ? value : path;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
