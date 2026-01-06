import React from "react";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/i18n-context";

interface MessageTextareaProps {
  value: string;
  onChange: (msg: string) => void;
  onRandomMessage: () => void;
}

export const MessageTextarea: React.FC<MessageTextareaProps> = ({ value, onChange, onRandomMessage }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
          {t("card_app.message_title")}
        </Label>
        <button
          onClick={onRandomMessage}
          className="text-[9px] font-bold uppercase text-pink-500 hover:text-pink-600 transition-colors"
          aria-label={t("card_app.random_msg")}
        >
          {t("card_app.random_msg")}
        </button>
      </div>
      <textarea
        className="w-full min-h-[80px] p-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all resize-none"
        placeholder={t("card_app.message_placeholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
