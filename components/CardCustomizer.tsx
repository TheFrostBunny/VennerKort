"use client";

import React from 'react';
import { 
  Palette, 
  Type, 
  Frame, 
  Sparkles, 
  Heart, 
  Users, 
  Lock as LockIcon,
  Share2,
  RefreshCcw,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useI18n } from '@/lib/i18n/i18n-context';

export type CardType = 'friend' | 'love' | 'crush';

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
}

interface CardCustomizerProps {
  state: CardState;
  onChange: (newState: Partial<CardState>) => void;
  onShare: () => void;
  onRandomMessage: () => void;
  isLinkCopied: boolean;
}

const FONTS = [
  { name: 'Dancing Script', value: 'var(--font-dancing-script, cursive)' },
  { name: 'Pacifico', value: 'var(--font-pacifico, cursive)' },
  { name: 'Quicksand', value: 'var(--font-quicksand, sans-serif)' },
  { name: 'Inter', value: 'var(--font-inter, sans-serif)' },
];

const COLORS = [
  { name: 'Pink', value: '#ffb6c1' },
  { name: 'Red', value: '#ff6b6b' },
  { name: 'Purple', value: '#dda0dd' },
  { name: 'Blue', value: '#87ceeb' },
  { name: 'Glass', value: 'rgba(255, 255, 255, 0.4)' },
];

const TEXT_COLORS = [
  { name: 'Deep Pink', value: '#ff1493' },
  { name: 'Purple', value: '#9400d3' },
  { name: 'Indigo', value: '#4b0082' },
  { name: 'Hot Pink', value: '#ff69b4' },
  { name: 'Black', value: '#1a1a1a' },
];

export const CardCustomizer: React.FC<CardCustomizerProps> = ({
  state,
  onChange,
  onShare,
  onRandomMessage,
  isLinkCopied,
}) => {
  const { t } = useI18n();

  const BORDERS = [
    { name: t('customizer.none'), value: 'none' },
    { name: t('customizer.double'), value: 'double' },
    { name: t('customizer.dashed'), value: 'dashed' },
    { name: t('customizer.glow'), value: 'glow' },
  ];

  const EFFECTS = [
    { name: t('customizer.none'), value: 'none' },
    { name: t('customizer.hearts'), value: 'hearts' },
    { name: t('customizer.sparkles'), value: 'sparkles' },
    { name: t('customizer.dots'), value: 'dots' },
    { name: t('customizer.waves'), value: 'waves' },
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 p-4 shadow-xl">
      <div className="flex-1 overflow-y-auto pr-1 -mr-1 scrollbar-hide space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            {t('customizer.title')}
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRandomMessage}
            className="h-7 w-7 p-0 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20"
          >
            <RefreshCcw className="w-3.5 h-3.5 text-pink-500" />
          </Button>
        </div>

        {/* Card Type */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tight opacity-50">
            <Heart className="w-3 h-3" /> {t('customizer.type')}
          </Label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'friend', icon: Users, label: t('customizer.friend'), emoji: '😊' },
              { id: 'love', icon: Heart, label: t('customizer.love'), emoji: '❤️' },
              { id: 'crush', icon: LockIcon, label: t('customizer.crush'), emoji: '💖' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onChange({ type: item.id as CardType, emoji: item.emoji })}
                className={cn(
                  "flex flex-col items-center justify-center p-1.5 rounded-xl border transition-all",
                  state.type === item.id 
                    ? "bg-pink-50 border-pink-200 text-pink-600 dark:bg-pink-500/10 dark:border-pink-500/30" 
                    : "border-zinc-100 dark:border-zinc-800 hover:border-pink-200 dark:hover:border-zinc-700"
                )}
              >
                <item.icon className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[9px] font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sender Name */}
        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-tight opacity-50">{t('card_app.sender_name')}</Label>
          <Input 
            id="name"
            placeholder={t('card_app.sender_placeholder')} 
            value={state.senderName}
            onChange={(e) => onChange({ senderName: e.target.value })}
            className="rounded-xl h-9 text-xs border-zinc-200 dark:border-zinc-800 focus:ring-pink-500"
          />
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">{t('card_app.message_title')}</Label>
            <button 
              onClick={onRandomMessage}
              className="text-[9px] font-bold uppercase text-pink-500 hover:text-pink-600 transition-colors"
            >
              {t('card_app.random_msg')}
            </button>
          </div>
          <textarea
            className="w-full min-h-[80px] p-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-pink-500/10 focus:border-pink-500 outline-none transition-all resize-none"
            placeholder={t('card_app.message_placeholder')}
            value={state.message}
            onChange={(e) => onChange({ message: e.target.value })}
          />
        </div>

        {/* Appearance Section */}
        <div className="space-y-3 pt-1">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
              {t('customizer.bg_color')}
            </Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onChange({ backgroundColor: c.value })}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 shadow-sm",
                    state.backgroundColor === c.value ? "border-pink-500 scale-110" : "border-white dark:border-zinc-800"
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
              {t('customizer.text_color')}
            </Label>
            <div className="flex flex-wrap gap-2">
              {TEXT_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onChange({ textColor: c.value })}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 shadow-sm",
                    state.textColor === c.value ? "border-pink-500 scale-110" : "border-white dark:border-zinc-800"
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Final Settings Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">{t('customizer.font')}</Label>
            <Select value={state.font} onValueChange={(v) => onChange({ font: v })}>
              <SelectTrigger className="rounded-xl h-8 text-[10px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map(f => (
                  <SelectItem key={f.value} value={f.value} className="text-[10px]">{f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">{t('customizer.border')}</Label>
            <Select value={state.border} onValueChange={(v) => onChange({ border: v })}>
              <SelectTrigger className="rounded-xl h-8 text-[10px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BORDERS.map(b => (
                  <SelectItem key={b.value} value={b.value} className="text-[10px]">{b.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">Effekt</Label>
          <Select value={state.effect} onValueChange={(v) => onChange({ effect: v })}>
            <SelectTrigger className="rounded-xl h-8 text-[10px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EFFECTS.map(e => (
                <SelectItem key={e.value} value={e.value} className="text-[10px]">{e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between py-1 px-1">
          <Label className="text-[10px] font-bold uppercase tracking-tight opacity-50">
            {t('customizer.show_indicator')}
          </Label>
          <button
            onClick={() => onChange({ showIndicator: !state.showIndicator })}
            className={cn(
              "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
              state.showIndicator ? "bg-pink-500" : "bg-zinc-200 dark:bg-zinc-800"
            )}
          >
            <span
              className={cn(
                "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
                state.showIndicator ? "translate-x-4" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <Button 
          onClick={onShare}
          className={cn(
            "w-full rounded-2xl h-11 text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95",
            isLinkCopied ? "bg-green-500 hover:bg-green-600 text-white" : "bg-pink-500 hover:bg-pink-600 text-white"
          )}
        >
          {isLinkCopied ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> {t('card_app.link_copied')}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Share2 className="w-4 h-4" /> {t('customizer.del_kort')}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
