import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  lang: string;
  setLang: (lang: string) => void;
  t: (key: string) => string;
}

export function LanguageSelector({ lang, setLang, t }: LanguageSelectorProps) {
  return (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          onClick={() => setLang('nb')}
          className={cn(
            "group flex items-center justify-between p-4 rounded-xl border transition-all text-left w-full",
            lang === 'nb'
              ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm"
              : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
          )}
          variant="outline"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🇳🇴</span>
            <div>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">Norsk (Bokmål)</div>
              <div className="text-xs text-zinc-500">Standard språk</div>
            </div>
          </div>
          {lang === 'nb' && <Check className="w-5 h-5 text-pink-500" />}
        </Button>
        <Button
          onClick={() => setLang('en')}
          className={cn(
            "group flex items-center justify-between p-4 rounded-xl border transition-all text-left w-full",
            lang === 'en'
              ? "bg-white dark:bg-zinc-800 border-pink-500 shadow-sm"
              : "bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
          )}
          variant="outline"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">🇺🇸</span>
            <div>
              <div className="font-bold text-zinc-900 dark:text-zinc-100">English</div>
              <div className="text-xs text-zinc-500">International language</div>
            </div>
          </div>
          {lang === 'en' && <Check className="w-5 h-5 text-pink-500" />}
        </Button>
      </div>
    </section>
  );
}
