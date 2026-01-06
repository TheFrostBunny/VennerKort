import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";

interface TimeLockInputProps {
  value: string | null;
  onChange: (val: string | null) => void;
}

export const TimeLockInput: React.FC<TimeLockInputProps> = ({ value, onChange }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-2 pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2">
        <Clock className="w-3.5 h-3.5 text-pink-500" />
        <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
          {t("customizer.time_lock_title")}
        </Label>
      </div>
      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">
        {t("customizer.time_lock_desc")}
      </p>
      <Input
        type="datetime-local"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="rounded-xl h-9 text-xs border-zinc-200 dark:border-zinc-800 focus:ring-pink-500 font-mono"
        min={new Date().toISOString().slice(0, 16)}
      />
    </div>
  );
};
