import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface EnvelopeOption {
  name: string;
  value: string;
}

interface EnvelopeSelectorProps {
  options: EnvelopeOption[];
  value: string;
  onChange: (envelope: string) => void;
  label: string;
}

export const EnvelopeSelector: React.FC<EnvelopeSelectorProps> = ({ options, value, onChange, label }) => {
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
