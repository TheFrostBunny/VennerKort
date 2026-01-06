import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/i18n-context";

interface SenderNameInputProps {
  value: string;
  onChange: (name: string) => void;
}

export const SenderNameInput: React.FC<SenderNameInputProps> = ({ value, onChange }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-1.5">
      <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-tight opacity-50">
        {t("card_app.sender_name")}
      </Label>
      <Input
        id="name"
        placeholder={t("card_app.sender_placeholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl h-9 text-xs border-zinc-200 dark:border-zinc-800 focus:ring-pink-500"
      />
    </div>
  );
};
