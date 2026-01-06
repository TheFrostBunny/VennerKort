import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BorderOption {
  name: string;
  value: string;
}

interface BorderSelectorProps {
  options: BorderOption[];
  value: string;
  onChange: (border: string) => void;
  label: string;
}

export const BorderSelector: React.FC<BorderSelectorProps> = ({ options, value, onChange, label }) => {
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
          {options.map((b) => (
            <SelectItem key={b.value} value={b.value} className="text-[10px]">
              {b.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
