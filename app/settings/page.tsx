"use client";

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { SidebarIconExample } from '@/components/sidebar';
import { useI18n } from '@/lib/i18n/i18n-context';
import { useAuth } from '@/lib/appwrite/auth-context';
import { ProfileCard } from '@/components/settings/ProfileCard';
import { LanguageSelector } from '@/components/settings/LanguageSelector';
import { ThemeSelector } from '@/components/settings/ThemeSelector';
import { AboutSection } from '@/components/settings/AboutSection';

export default function SettingsPage() {
  const { lang, setLang, t } = useI18n();
  const { user, profileImageUrl } = useAuth();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  const { theme, setTheme } = useTheme();
  const [username, setUsername] = useState(user?.name || "");
  const [savingUsername, setSavingUsername] = useState(false);
  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex-1 flex flex-col gap-8 p-2 sm:p-6 md:p-10 max-w-full md:max-w-4xl mx-auto w-full transition-colors bg-white dark:bg-zinc-950 overflow-y-auto scrollbar-hide">
          {/* Menu/cards grid */}
          <div className="grid gap-8">
            {user && (
              <ProfileCard
                name={user.name || ''}
                email={user.email || ''}
                profileImageUrl={profileImageUrl ?? undefined}
              />
            )}

            <LanguageSelector lang={String(lang)} setLang={l => setLang(l as any)} t={t} />
         {/* Theme Picker Card */}
         <ThemeSelector theme={theme || 'light'} setTheme={setTheme} t={t} mounted={mounted} />



            <AboutSection t={t} />
          </div>
        </div>
      </main>
    </SidebarIconExample>
  );
}
