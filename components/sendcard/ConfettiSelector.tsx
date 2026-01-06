import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ConfettiOption {
  name: string;
  value: string;
}

interface ConfettiSelectorProps {
  options: ConfettiOption[];
  value: string;
  onChange: (confetti: string) => void;
  label: string;
}

export const ConfettiSelector: React.FC<ConfettiSelectorProps> = ({ options, value, onChange, label }) => {
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
          {options.map((c) => (
            <SelectItem key={c.value} value={c.value} className="text-[10px]">
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
