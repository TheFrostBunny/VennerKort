import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ShowIndicatorSwitchProps {
  value: boolean;
  onChange: (show: boolean) => void;
  label: string;
}

export const ShowIndicatorSwitch: React.FC<ShowIndicatorSwitchProps> = ({ value, onChange, label }) => {
  return (
    <div className="flex items-center justify-between py-1 px-1">
      <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
        {label}
      </Label>
      <button
        onClick={() => onChange(!value)}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          value ? "bg-pink-500" : "bg-zinc-200 dark:bg-zinc-800"
        )}
        aria-label={label}
        {...(value ? { "aria-checked": "true" } : { "aria-checked": "false" })}
        role="switch"
        type="button"
      >
        <span
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
            value ? "translate-x-4" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
};
