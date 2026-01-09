import React from "react";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/i18n-context";

export interface LanguageSelectorCardProps {
  value: string;
  onChange: (lang: string) => void;
  options?: { label: string; value: string }[];
}

const DEFAULT_LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Norsk", value: "nb" },
];

export const LanguageSelectorCard: React.FC<LanguageSelectorCardProps> = ({ value, onChange, options }) => {
  const { t } = useI18n();
  const langs = options || DEFAULT_LANGUAGES;
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
        {t("customizer.language")}
      </Label>
      <select
        className="w-full p-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {langs.map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
