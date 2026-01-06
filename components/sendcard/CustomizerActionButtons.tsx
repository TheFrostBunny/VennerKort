import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/i18n-context";

interface CustomizerActionButtonsProps {
  onPreview?: () => void;
  onShare: () => void;
  isLinkCopied: boolean;
}

export const CustomizerActionButtons: React.FC<CustomizerActionButtonsProps> = ({ onPreview, onShare, isLinkCopied }) => {
  const { t } = useI18n();
  return (
    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex flex-col gap-2">
      <Button
        variant="outline"
        onClick={onPreview}
        className="w-full rounded-2xl h-11 text-xs font-black uppercase tracking-widest transition-all border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800"
      >
        <span className="flex items-center gap-2">
          <Eye className="w-4 h-4" /> {t("card_app.preview")}
        </span>
      </Button>
      <Button
        onClick={onShare}
        className={cn(
          "w-full rounded-2xl h-11 text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95",
          isLinkCopied
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-pink-500 hover:bg-pink-600 text-white"
        )}
      >
        {isLinkCopied ? (
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" /> {t("card_app.link_copied")}
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Share2 className="w-4 h-4" /> {t("customizer.del_kort")}
          </span>
        )}
      </Button>
    </div>
  );
};
