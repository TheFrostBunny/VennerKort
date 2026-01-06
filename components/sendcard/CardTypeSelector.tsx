import React from "react";
import { Heart, Users, Lock as LockIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CardType } from "./CardCustomizer";
import { useI18n } from "@/lib/i18n/i18n-context";

interface CardTypeSelectorProps {
  value: CardType;
  onChange: (type: CardType, emoji: string) => void;
}

const CARD_TYPES = [
  { id: "friend", icon: Users, labelKey: "customizer.friend", emoji: "😊" },
  { id: "love", icon: Heart, labelKey: "customizer.love", emoji: "❤️" },
  { id: "crush", icon: LockIcon, labelKey: "customizer.crush", emoji: "💖" },
];

export const CardTypeSelector: React.FC<CardTypeSelectorProps> = ({ value, onChange }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight opacity-50">
        <Heart className="w-3 h-3" /> {t("customizer.type")}
      </Label>
      <div className="grid grid-cols-3 gap-1.5">
        {CARD_TYPES.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id as CardType, item.emoji)}
            className={cn(
              "flex flex-col items-center justify-center p-1.5 rounded-xl border transition-all",
              value === item.id
                ? "bg-pink-50 border-pink-200 text-pink-600 dark:bg-pink-500/10 dark:border-pink-500/30"
                : "border-zinc-100 dark:border-zinc-800 hover:border-pink-200 dark:hover:border-zinc-700"
            )}
            aria-label={`${t("customizer.type")}: ${t(item.labelKey)}`}
          >
            <item.icon className="w-3.5 h-3.5 mb-0.5" />
            <span className="text-[9px] font-bold">{t(item.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
