"use client";

import React from "react";
import { Sparkles, RefreshCcw, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/i18n-context";
import { CardTypeSelector } from "./CardTypeSelector";
import { SenderNameInput } from "./SenderNameInput";
import { MessageTextarea } from "./MessageTextarea";
import { ColorPicker } from "./ColorPicker";
import { FontSelector } from "./FontSelector";
import { BorderSelector } from "./BorderSelector";
import { EffectSelector } from "./EffectSelector";
import { ConfettiSelector } from "./ConfettiSelector";
import { EnvelopeSelector } from "./EnvelopeSelector";
import { ShowIndicatorSwitch } from "./ShowIndicatorSwitch";
import { TimeLockInput } from "./TimeLockInput";
import { CustomizerActionButtons } from "./CustomizerActionButtons";
import { LanguageSelectorCard } from "./LanguageSelectorCard";
import { translations } from "@/lib/i18n/translations";
import { DEFAULT_MESSAGES } from "@/lib/constants";
import { DEFAULT_MESSAGES_EN } from "@/lib/constants-en";

export type CardType = "friend" | "love" | "crush";

export interface CardState {
  type: CardType;
  message: string;
  senderName: string;
  backgroundColor: string;
  textColor: string;
  font: string;
  border: string;
  effect: string;
  emoji: string;
  showIndicator: boolean;
  confettiType: "standard" | "hearts" | "stars" | "snow";
  envelopeStyle: "classic" | "modern" | "vintage";
  unlockAt: string | null;
  language: string; // Språk for kortet
}

interface CardCustomizerProps {
  state: CardState;
  onChange: (newState: Partial<CardState>) => void;
  onShare: () => void;
  onPreview?: () => void;
  onRandomMessage: () => void;
  isLinkCopied: boolean;
  // Ny prop for random utseende, men fallback til lokal hvis ikke sendt inn
  onRandomizeAppearance?: () => void;
}

const FONTS = [
  { name: "Dancing Script", value: "var(--font-dancing-script, cursive)" },
  { name: "Pacifico", value: "var(--font-pacifico, cursive)" },
  { name: "Quicksand", value: "var(--font-quicksand, sans-serif)" },
  { name: "Inter", value: "var(--font-inter, sans-serif)" },
];

const COLORS = [
  { name: "Pink", value: "#ffb6c1" },
  { name: "Red", value: "#ff6b6b" },
  { name: "Purple", value: "#dda0dd" },
  { name: "Blue", value: "#87ceeb" },
  { name: "Glass", value: "rgba(255, 255, 255, 0.4)" },
];

const TEXT_COLORS = [
  { name: "Deep Pink", value: "#ff1493" },
  { name: "Purple", value: "#9400d3" },
  { name: "Indigo", value: "#4b0082" },
  { name: "Hot Pink", value: "#ff69b4" },
  { name: "Black", value: "#1a1a1a" },
];

export const CardCustomizer: React.FC<CardCustomizerProps> = ({
  state,
  onChange,
  onShare,
  onPreview,
  onRandomMessage,
  isLinkCopied,
}) => {
  const { t } = useI18n();

  const BORDERS = [
    { name: t("customizer.none"), value: "none" },
    { name: t("customizer.double"), value: "double" },
    { name: t("customizer.dashed"), value: "dashed" },
    { name: t("customizer.glow"), value: "glow" },
  ];

  const EFFECTS = [
    { name: t("customizer.none"), value: "none" },
    { name: t("customizer.hearts"), value: "hearts" },
    { name: t("customizer.sparkles"), value: "sparkles" },
    { name: t("customizer.dots"), value: "dots" },
    { name: t("customizer.waves"), value: "waves" },
  ];

  const CONFETTI = [
    { name: t("customizer.confetti_standard"), value: "standard" },
    { name: t("customizer.confetti_hearts"), value: "hearts" },
    { name: t("customizer.confetti_stars"), value: "stars" },
    { name: t("customizer.confetti_snow"), value: "snow" },
  ];

  const ENVELOPES = [
    { name: t("customizer.env_classic"), value: "classic" },
    { name: t("customizer.env_modern"), value: "modern" },
    { name: t("customizer.env_vintage"), value: "vintage" },
  ];

  // Funksjon for å randomisere utseende
  const handleRandomizeAppearance = () => {
    // Tilfeldige valg fra eksisterende arrays
    const pick = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)].value;
    const type = state.type || 'friend';
    let message = state.message;
    if (state.language === 'en') {
      const arr = DEFAULT_MESSAGES_EN[type] || [];
      if (arr.length > 0) {
        message = arr[Math.floor(Math.random() * arr.length)];
      }
    } else {
      const arr = DEFAULT_MESSAGES[type] || [];
      if (arr.length > 0) {
        message = arr[Math.floor(Math.random() * arr.length)];
      }
    }
    onChange({
      backgroundColor: pick(COLORS),
      textColor: pick(TEXT_COLORS),
      font: pick(FONTS),
      border: pick(BORDERS),
      effect: pick(EFFECTS),
      confettiType: pick(CONFETTI),
      envelopeStyle: pick(ENVELOPES),
      message,
    });
  };

  return (
    <div className="h-full flex flex-col bg-transparent p-0 sm:bg-white sm:dark:bg-zinc-900 sm:border-l sm:border-zinc-200 sm:dark:border-zinc-800 sm:p-4 sm:shadow-xl">
      <div className="flex-1 overflow-y-auto pr-1 -mr-1 scrollbar-hide space-y-3 sm:space-y-4 pb-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 gap-2">
          <h2 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            {t("customizer.title")}
          </h2>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={handleRandomizeAppearance}
              className="h-7 w-7 p-0 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-center"
              aria-label={t("customizer.random_appearance")}
            >
              <Shuffle className="w-3.5 h-3.5 text-blue-500" />
            </button>
          </div>
        </div>

        {/* Språkvelger */}
        <LanguageSelectorCard
          value={state.language}
          onChange={(language) => {
            let message = state.message;
            if (language === 'en') {
              // Velg tilfeldig engelsk melding for valgt type
              const arr = DEFAULT_MESSAGES_EN[state.type] || [];
              if (arr.length > 0) {
                message = arr[Math.floor(Math.random() * arr.length)];
              }
            } else if (language === 'nb') {
              // Velg tilfeldig norsk melding for valgt type
              const arr = DEFAULT_MESSAGES[state.type] || [];
              if (arr.length > 0) {
                message = arr[Math.floor(Math.random() * arr.length)];
              }
            }
            onChange({
              language,
              message,
            });
          }}
        />

        {/* Card Type */}
        <CardTypeSelector
          value={state.type}
          onChange={(type, emoji) => onChange({ type, emoji })}
        />

        {/* Sender Name */}
        <SenderNameInput
          value={state.senderName}
          onChange={(name) => onChange({ senderName: name })}
        />

        {/* Message */}
        <MessageTextarea
          value={state.message}
          onChange={(msg) => onChange({ message: msg })}
          onRandomMessage={onRandomMessage}
        />

        {/* Appearance Section */}
        <div className="space-y-3 pt-1">
          <ColorPicker
            label={t("customizer.bg_color")}
            options={COLORS}
            value={state.backgroundColor}
            onChange={(color) => onChange({ backgroundColor: color })}
            ariaLabelPrefix={t("customizer.bg_color")}
          />
          <ColorPicker
            label={t("customizer.text_color")}
            options={TEXT_COLORS}
            value={state.textColor}
            onChange={(color) => onChange({ textColor: color })}
            ariaLabelPrefix={t("customizer.text_color")}
          />
        </div>

        {/* Final Settings Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <FontSelector
            options={FONTS}
            value={state.font}
            onChange={(font) => onChange({ font })}
          />
          <BorderSelector
            options={BORDERS}
            value={state.border}
            onChange={(border) => onChange({ border })}
            label={t("customizer.border")}
          />
        </div>

        <EffectSelector
          options={EFFECTS}
          value={state.effect}
          onChange={(effect) => onChange({ effect })}
          label={t("customizer.effect")}
        />

        <div className="grid grid-cols-2 gap-3">
          <ConfettiSelector
            options={CONFETTI}
            value={state.confettiType}
            onChange={(confetti) => onChange({ confettiType: confetti as any })}
            label={t("customizer.confetti")}
          />
          <EnvelopeSelector
            options={ENVELOPES}
            value={state.envelopeStyle}
            onChange={(envelope) => onChange({ envelopeStyle: envelope as any })}
            label={t("customizer.envelope_style")}
          />
        </div>

        <ShowIndicatorSwitch
          value={state.showIndicator}
          onChange={(show) => onChange({ showIndicator: show })}
          label={t("customizer.show_indicator")}
        />

        {/* Time Lock Section */}
        <TimeLockInput
          value={state.unlockAt}
          onChange={(val) => onChange({ unlockAt: val })}
        />
      </div>

      <CustomizerActionButtons
        onPreview={onPreview}
        onShare={onShare}
        isLinkCopied={isLinkCopied}
      />
    </div>
  );
};
