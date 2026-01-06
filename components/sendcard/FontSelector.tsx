import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n/i18n-context";

interface FontOption {
  name: string;
  value: string;
}

interface FontSelectorProps {
  options: FontOption[];
  value: string;
  onChange: (font: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({ options, value, onChange }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
        {t("customizer.font")}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-xl h-8 text-[10px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((f) => (
            <SelectItem key={f.value} value={f.value} className="text-[10px]">
              {f.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
