import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface EffectOption {
  name: string;
  value: string;
}

interface EffectSelectorProps {
  options: EffectOption[];
  value: string;
  onChange: (effect: string) => void;
  label: string;
}

export const EffectSelector: React.FC<EffectSelectorProps> = ({ options, value, onChange, label }) => {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="rounded-xl h-8 text-[10px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((e) => (
            <SelectItem key={e.value} value={e.value} className="text-[10px]">
              {e.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
