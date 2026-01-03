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

const BORDERS = [
  { name: 'None', value: 'none' },
  { name: 'Simple', value: 'simple' },
  { name: 'Hearts', value: 'hearts' },
  { name: 'Dotted', value: 'dotted' },
];

const EFFECTS = [
  { name: 'None', value: 'none' },
  { name: 'Hearts', value: 'hearts' },
  { name: 'Stars', value: 'sparkles' },
  { name: 'Dots', value: 'dots' },
  { name: 'Waves', value: 'waves' },
];

export const CardCustomizer: React.FC<CardCustomizerProps> = ({
  state,
  onChange,
  onShare,
  onRandomMessage,
  isLinkCopied,
}) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-l border-zinc-200 dark:border-zinc-800 h-full overflow-y-auto w-full md:w-80 shadow-2xl">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-pink-500" />
        <h2 className="text-xl font-bold tracking-tight">Tilpass Kort</h2>
      </div>

      <div className="space-y-4">
        {/* Card Type */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium opacity-70">
            <Heart className="w-4 h-4" /> Korttype
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'friend', icon: Users, label: 'Venn', emoji: '😊' },
              { id: 'love', icon: Heart, label: 'Kjærlighet', emoji: '❤️' },
              { id: 'crush', icon: LockIcon, label: 'Crush', emoji: '💖' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => onChange({ type: t.id as CardType, emoji: t.emoji })}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl border transition-all",
                  state.type === t.id 
                    ? "bg-pink-50 border-pink-200 text-pink-600 dark:bg-pink-500/10 dark:border-pink-500/30" 
                    : "border-zinc-200 dark:border-zinc-800 hover:border-pink-200 dark:hover:border-zinc-700"
                )}
              >
                <t.icon className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sender Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium opacity-70">Ditt Navn</Label>
          <Input 
            id="name"
            placeholder="Skriv navnet ditt..." 
            value={state.senderName}
            onChange={(e) => onChange({ senderName: e.target.value })}
            className="rounded-xl border-zinc-200 dark:border-zinc-800 focus:ring-pink-500"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium opacity-70">Melding</Label>
            <button 
              onClick={onRandomMessage}
              className="text-[10px] flex items-center gap-1 text-pink-500 hover:text-pink-600 transition-colors"
            >
              <RefreshCcw className="w-3 h-3" /> Ny melding
            </button>
          </div>
          <textarea
            className="w-full min-h-[100px] p-3 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all resize-none"
            placeholder="Skriv en koselig melding..."
            value={state.message}
            onChange={(e) => onChange({ message: e.target.value })}
          />
        </div>

        {/* Appearance Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-medium opacity-70">
              <Palette className="w-3 h-3" /> Farge
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onChange({ backgroundColor: c.value })}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110",
                    state.backgroundColor === c.value ? "border-pink-500 scale-110" : "border-white dark:border-zinc-800"
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-medium opacity-70">
              <Type className="w-3 h-3" /> Tekstfarge
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {TEXT_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => onChange({ textColor: c.value })}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110",
                    state.textColor === c.value ? "border-pink-500 scale-110" : "border-white dark:border-zinc-800"
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Font & Border */}
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-xs font-medium opacity-70">
              <Type className="w-3 h-3" /> Skrifttype
            </Label>
            <Select value={state.font} onValueChange={(v) => onChange({ font: v })}>
              <SelectTrigger className="rounded-xl h-9 text-xs">
                <SelectValue placeholder="Velg font" />
              </SelectTrigger>
              <SelectContent>
                {FONTS.map(f => (
                  <SelectItem key={f.value} value={f.value} className="text-xs">{f.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-medium opacity-70">
                <Frame className="w-3 h-3" /> Ramme
              </Label>
              <Select value={state.border} onValueChange={(v) => onChange({ border: v })}>
                <SelectTrigger className="rounded-xl h-9 text-xs">
                  <SelectValue placeholder="Ramme" />
                </SelectTrigger>
                <SelectContent>
                  {BORDERS.map(b => (
                    <SelectItem key={b.value} value={b.value} className="text-xs">{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs font-medium opacity-70">
                <Sparkles className="w-3 h-3" /> Effekt
              </Label>
              <Select value={state.effect} onValueChange={(v) => onChange({ effect: v })}>
                <SelectTrigger className="rounded-xl h-9 text-xs">
                  <SelectValue placeholder="Effekt" />
                </SelectTrigger>
                <SelectContent>
                  {EFFECTS.map(e => (
                    <SelectItem key={e.value} value={e.value} className="text-xs">{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-6">
        <Button 
          onClick={onShare}
          className={cn(
            "w-full rounded-2xl h-12 font-bold transition-all shadow-lg active:scale-95",
            isLinkCopied ? "bg-green-500 hover:bg-green-600" : "bg-pink-500 hover:bg-pink-600 text-white"
          )}
        >
          {isLinkCopied ? (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" /> Kopiert!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Share2 className="w-5 h-5" /> Del Kortet
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
