"use client";

import React from 'react';
import { Settings as SettingsIcon, Globe, Check, Heart, Info, Rocket } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18n-context';
import { cn } from '@/lib/utils';

export const Settings: React.FC = () => {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full transition-colors bg-white dark:bg-zinc-950 overflow-y-auto scrollbar-hide">
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-zinc-400" />
          {t('customizer.settings')}
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('customizer.settings_desc')}</p>
      </div>

      <div className="grid gap-6">
        <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.language_select')}</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('customizer.language_desc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setLang('nb')}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                lang === 'nb' 
                  ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm" 
                  : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🇳🇴</span>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">Norsk (Bokmål)</div>
                  <div className="text-xs text-zinc-500">Standard språk</div>
                </div>
              </div>
              {lang === 'nb' && <Check className="w-5 h-5 text-pink-500" />}
            </button>

            <button
              onClick={() => setLang('en')}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                lang === 'en' 
                  ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm" 
                  : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🇺🇸</span>
                <div>
                  <div className="font-bold text-zinc-900 dark:text-zinc-100">English</div>
                  <div className="text-xs text-zinc-500">International language</div>
                </div>
              </div>
              {lang === 'en' && <Check className="w-5 h-5 text-pink-500" />}
            </button>
          </div>
        </section>
        
        <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.about_title')}</h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('about.subtitle')}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t('about.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-pink-500">
                  <Rocket className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('about.mission_title')}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t('about.mission_desc')}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-blue-500">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t('about.creator_title')}</span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {t('about.creator_desc')}
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-[10px] text-zinc-400 font-medium">
              <div className="flex flex-col gap-0.5">
                <span>© {new Date().getFullYear()} HappySend</span>
                <button 
                  onClick={() => window.location.href = '/changelog'}
                  className="text-pink-500 hover:text-pink-600 font-bold flex items-center gap-1 transition-colors"
                >
                  <Rocket className="w-3 h-3" />
                  {t('customizer.view_changes')}
                </button>
              </div>
              <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full uppercase tracking-widest">{t('about.version')}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
