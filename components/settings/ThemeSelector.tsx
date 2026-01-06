import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  theme: string;
  setTheme: (theme: string) => void;
  t: (key: string) => string;
  mounted: boolean;
}

export function ThemeSelector({ theme, setTheme, t, mounted }: ThemeSelectorProps) {
  if (!mounted) return null;
  return (
    <section className="p-3 sm:p-4 md:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
          <Rocket className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.theme_title')}</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('customizer.theme_desc')}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        <Button
          onClick={() => setTheme('light')}
          className={cn(
            "group flex items-center justify-between p-4 rounded-xl border transition-all text-left w-full",
            theme === 'light'
              ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm"
              : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
          )}
          variant="outline"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🌞</span>
            <div>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.theme_light')}</div>
              <div className="text-xs text-zinc-500">{t('customizer.theme_light')} {t('customizer.mode')}</div>
            </div>
          </div>
          {theme === 'light' && <Check className="w-5 h-5 text-pink-500" />}
        </Button>
        <Button
          onClick={() => setTheme('dark')}
          className={cn(
            "group flex items-center justify-between p-4 rounded-xl border transition-all text-left w-full",
            theme === 'dark'
              ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm"
              : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
          )}
          variant="outline"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🌙</span>
            <div>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.theme_dark')}</div>
              <div className="text-xs text-zinc-500">{t('customizer.theme_dark')} {t('customizer.mode')}</div>
            </div>
          </div>
          {theme === 'dark' && <Check className="w-5 h-5 text-pink-500" />}
        </Button>
        <Button
          onClick={() => setTheme('system')}
          className={cn(
            "group flex items-center justify-between p-4 rounded-xl border transition-all text-left w-full",
            theme === 'system'
              ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm"
              : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
          )}
          variant="outline"
        >
          <div className="flex items-center gap-4">
            <span className="text-2xl">🖥️</span>
            <div>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">{t('customizer.system')}</div>
              <div className="text-xs text-zinc-500">{t('customizer.FollowSystem')}</div>
            </div>
          </div>
          {theme === 'system' && <Check className="w-5 h-5 text-pink-500" />}
        </Button>
      </div>
    </section>
  );
}
