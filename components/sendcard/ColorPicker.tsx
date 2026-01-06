import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/i18n-context";

interface ColorOption {
  name: string;
  value: string;
}

interface ColorPickerProps {
  label: string;
  options: ColorOption[];
  value: string;
  onChange: (color: string) => void;
  ariaLabelPrefix: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, options, value, onChange, ariaLabelPrefix }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
        {label}
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((c) => {
          const buttonRef = React.useRef<HTMLButtonElement>(null);
          React.useEffect(() => {
            if (buttonRef.current) {
              buttonRef.current.style.setProperty("--dynamic-color", c.value);
            }
          }, [c.value]);
          return (
            <button
              key={c.value}
              ref={buttonRef}
              onClick={() => onChange(c.value)}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 shadow-sm",
                value === c.value
                  ? "border-pink-500 scale-110"
                  : "border-white dark:border-zinc-800"
              )}
              data-color={c.value}
              aria-label={`${ariaLabelPrefix}: ${c.name}`}
              title={`${ariaLabelPrefix}: ${c.name}`}
            />
          );
        })}
      </div>
    </div>
  );
};
