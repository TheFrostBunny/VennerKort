"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkle, MailOpen, Mail, Lock as LockIcon, RefreshCcw, Clock, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardState } from './sendcard/CardCustomizer';
import confetti from 'canvas-confetti';
import { useI18n } from '@/lib/i18n/i18n-context';
import { DEFAULT_MESSAGES } from '@/lib/constants';
import { DEFAULT_MESSAGES_EN } from '@/lib/constants-en';

interface GreetingCardProps {
  state: CardState;
  isViewOnly?: boolean;
  onOpen?: () => void;
}

export const GreetingCard: React.FC<GreetingCardProps> = ({ state, isViewOnly = false, onOpen }) => {
  const [isOpen, setIsOpen] = useState(!isViewOnly);
  // const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { t } = useI18n();

  // Sync state when entering view-only/preview mode
  useEffect(() => {
    if (isViewOnly) {
      setIsOpen(false);
      // setIsFlipped(true); // Flip-funksjon fjernet
    } else {
      setIsOpen(true);
    }
  }, [isViewOnly]);

  const handleOpen = () => {
    if (!isOpen) {
      // Check for time lock
      if (state.unlockAt && new Date(state.unlockAt) > new Date()) {
        const unlockDate = new Date(state.unlockAt);
        // Shake animation or toast could go here, but for now we Rely on the UI showing it's locked
        return;
      }

      setIsOpen(true);
      onOpen?.();

      const config: any = {
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        ticks: 300,
        gravity: 0.8,
        scalar: 1.2
      };

      if (state.confettiType === 'hearts') {
        config.colors = ['#ff69b4', '#ffb6c1', '#ff1493'];
        config.shapes = ['circle'];
      } else if (state.confettiType === 'stars') {
        config.colors = ['#ffd700', '#daa520', '#fffacd'];
      } else if (state.confettiType === 'snow') {
        config.colors = ['#ffffff', '#f0f8ff', '#e0ffff'];
        config.scalar = 0.7;
        config.gravity = 0.5;
        config.particleCount = 200;
      } else {
        config.colors = ['#ff69b4', '#ffb6c1', '#dda0dd', '#ff1493', '#f472b6', '#db2777'];
      }

      confetti(config);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isOpen) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  const borderStyles: Record<string, string> = {
    none: "border-transparent",
    double: "border-[10px] border-double border-current",
    dashed: "border-4 border-dashed border-current",
    glow: "border-2 border-current shadow-[0_0_20px_white] ring-4 ring-current/20",
  };

  const getEffectOverlay = () => {
    switch (state.effect) {
      case 'hearts':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  y: [0, -20, 0],
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                <Heart className="text-current w-6 h-6" />
              </motion.div>
            ))}
          </div>
        );
      case 'sparkles':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                <Sparkle className="text-current w-4 h-4" />
              </motion.div>
            ))}
          </div>
        );
      case 'dots':
        return <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '15px 15px' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex items-center justify-center p-2 min-h-[400px] w-full perspective-[1200px]">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope-wrapper"
            className="relative w-full max-w-[440px] aspect-[4/3] group"
            style={{ 
              transformStyle: 'preserve-3d',
              rotateX: mousePosition.y * 15,
              rotateY: mousePosition.x * 15,
            }}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.1, opacity: 0, rotateY: 45, transition: { duration: 0.5 } }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePosition({ x: 0, y: 0 });
            }}
            onMouseMove={handleMouseMove}
          >
            <motion.div 
              className="w-full h-full relative"
              style={{ transformStyle: 'preserve-3d' }}
              // Flip-funksjon fjernet
              onClick={handleOpen}
            >
              {/* ENVELOPE FRONT (Address Side) - Based on user image */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-[2.5rem] shadow-2xl overflow-hidden border transition-colors",
                  state.envelopeStyle === 'modern' ? "bg-zinc-900 border-zinc-800" : 
                  state.envelopeStyle === 'vintage' ? "bg-[#f4e4bc] border-[#d4c49c]" :
                  "bg-white border-zinc-100"
                )}
                style={{ transform: 'rotateY(180deg) translateZ(1px)', backfaceVisibility: 'hidden' }}
              >
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />
                
                {/* Stamp Box - Matching the dashed rectangle with dots from image */}
                <div 
                  className="absolute top-12 right-12 w-20 h-24 border-[3px] border-dotted flex items-center justify-center rotate-3"
                  style={{ borderColor: state.textColor, opacity: 0.5 }}
                >
                  <div className="relative group/stamp">
                    {state.type === 'love' ? (
                      <Heart className="w-10 h-10" style={{ color: state.textColor, fill: `${state.textColor}40` }} />
                    ) : state.type === 'crush' ? (
                      <LockIcon className="w-10 h-10" style={{ color: state.textColor }} />
                    ) : (
                      <Mail className="w-10 h-10" style={{ color: state.textColor }} />
                    )}
                  </div>
                  {/* Corner dots */}
                  <div className="absolute -top-[5px] -left-[5px] w-3 h-3 rounded-full" style={{ backgroundColor: state.textColor }} />
                  <div className="absolute -top-[5px] -right-[5px] w-3 h-3 rounded-full" style={{ backgroundColor: state.textColor }} />
                  <div className="absolute -bottom-[5px] -left-[5px] w-3 h-3 rounded-full" style={{ backgroundColor: state.textColor }} />
                  <div className="absolute -bottom-[5px] -right-[5px] w-3 h-3 rounded-full" style={{ backgroundColor: state.textColor }} />
                </div>

                {/* Address Lines - Matching the user image */}
                <div className="absolute top-[55%] left-12 md:left-24 w-[60%] space-y-4">
                  <div className="relative h-[2px] w-full" style={{ backgroundColor: state.textColor, opacity: 0.2 }}>
                    {state.senderName && (
                      <span className="absolute -top-6 left-0 text-[10px] md:text-sm font-bold italic tracking-tight" style={{ color: state.textColor, opacity: 0.7 }}>
                        Fra: {state.senderName}
                      </span>
                    )}
                  </div>
                  <div className="h-[2px] w-[80%]" style={{ backgroundColor: state.textColor, opacity: 0.2 }} />
                  <div className="h-[2px] w-[60%]" style={{ backgroundColor: state.textColor, opacity: 0.2 }} />
                </div>

                {/* PRIORITY MAIL Text */}
                <div className="absolute bottom-12 left-12">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] opacity-90" style={{ color: state.textColor }}>Priority Mail</span>
                </div>
              </div>

              {/* Envelope Back (Flap Side) */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-[2.5rem] shadow-2xl overflow-hidden border transition-colors",
                  state.envelopeStyle === 'modern' ? "bg-zinc-900 border-zinc-800" : 
                  state.envelopeStyle === 'vintage' ? "bg-[#f4e4bc] border-[#d4c49c]" :
                  "bg-white border-zinc-100"
                )}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />
                
                {/* Envelope Flap */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[142%] h-[142%] rotate-45 transform origin-top border-b transition-colors"
                  style={{
                    backgroundColor: state.envelopeStyle === 'modern' ? 'rgba(39, 39, 42, 0.3)' : 
                                    state.envelopeStyle === 'vintage' ? 'rgba(228, 212, 172, 0.5)' : 
                                    'rgba(244, 244, 245, 0.5)',
                    borderColor: state.envelopeStyle === 'modern' ? 'rgba(63, 63, 70, 0.5)' : 
                                 state.envelopeStyle === 'vintage' ? 'rgba(196, 180, 140, 0.5)' : 
                                 'rgba(228, 228, 231, 0.5)'
                  }}
                />
                {/* Design Elements */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      scale: [1, 1.05, 1],
                      filter: ["drop-shadow(0 5px 15px rgba(244,114,182,0.3))", "drop-shadow(0 15px 35px rgba(244,114,182,0.5))", "drop-shadow(0 5px 15px rgba(244,114,182,0.3))"]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-pink-400 blur-2xl opacity-20 scale-150" />
                    
                    {/* Icon Selection Logic */}
                    {state.unlockAt && new Date(state.unlockAt) > new Date() ? (
                       <div className="relative">
                         <LockIcon className="w-16 h-16 text-zinc-400 fill-zinc-400/20 relative z-10" />
                         <div className="absolute -bottom-2 -right-2 bg-pink-500 rounded-full p-1 border-2 border-white">
                            <Clock className="w-4 h-4 text-white" />
                         </div>
                       </div>
                    ) : state.type === 'love' ? (
                      <Heart className="w-16 h-16 text-pink-500 fill-pink-500 relative z-10" />
                    ) : state.type === 'crush' ? (
                      <LockIcon className="w-16 h-16 text-purple-500 relative z-10" />
                    ) : (
                      <Mail className="w-16 h-16 text-blue-500 relative z-10" />
                    )}
                  </motion.div>

                  <div className="text-center px-8">
                    {state.unlockAt && new Date(state.unlockAt) > new Date() ? (
                      <>
                        <h3 className={cn(
                          "text-lg font-black mb-1 tracking-tight transition-colors flex items-center justify-center gap-2",
                          state.envelopeStyle === 'modern' ? "text-zinc-100" : "text-zinc-900"
                        )}>
                          {t('customizer.card_is_locked')}
                        </h3>
                        <div className={cn(
                          "flex flex-col items-center gap-1 text-sm font-medium",
                           state.envelopeStyle === 'modern' ? "text-zinc-400" : "text-zinc-500"
                        )}>
                          <span className="opacity-80">{t('customizer.opens_in')}:</span>
                          <span className="font-mono font-bold bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded text-xs">
                             {new Date(state.unlockAt).toLocaleString()}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className={cn(
                          "text-xl font-black mb-2 tracking-tight transition-colors",
                          state.envelopeStyle === 'modern' ? "text-zinc-100" : "text-zinc-900"
                        )}>
                          {isViewOnly ? t('customizer.receive_title') || 'Du har fått et kort!' : 'Klikk for å se kortet'}
                        </h3>
                        <p className={cn(
                          "text-sm font-medium transition-colors",
                          state.envelopeStyle === 'modern' ? "text-zinc-400" : "text-zinc-500"
                        )}>
                          {isViewOnly ? `Spesielt levert fra ${state.senderName || 'en venn'}` : 'Se hvordan din hilsen ser ut'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Indicator */}
            <AnimatePresence>
              {isHovered && state.showIndicator && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [1, 1.2, 1], opacity: 1, rotate: [0, 10, -10, 0] }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg pointer-events-none z-20"
                  transition={{ 
                    scale: { type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { type: "tween", duration: 2, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.3 },
                    default: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <Sparkle className="w-6 h-6 fill-current" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="card-reveal"
            initial={{ scale: 0.5, opacity: 0, y: 100, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 80 }}
            className="group relative w-full max-w-[640px] min-h-[460px] bg-white rounded-[2rem] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col items-center justify-center p-12 text-center"
            style={{ 
              backgroundColor: state.backgroundColor,
              fontFamily: state.font
            }}
          >
            {/* Luxe Card Elements */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />
            
            {/* Postcard Aesthetic Elements */}
            <div className="absolute top-8 left-8 flex flex-col items-start gap-1 opacity-40">
               <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: state.textColor }}>Priority Mail</span>
               <div className="w-12 h-0.5 bg-current" style={{ color: state.textColor }} />
            </div>

            <div className="absolute top-8 right-8 w-16 h-20 border-2 border-dotted border-current opacity-30 flex items-center justify-center rotate-3" style={{ color: state.textColor }}>
               {state.type === 'love' ? <Heart className="w-8 h-8 fill-current" /> : state.type === 'crush' ? <LockIcon className="w-8 h-8" /> : <Mail className="w-8 h-8" />}
            </div>

            {/* Background Effects */}
            {getEffectOverlay()}
            
            {state.border !== 'none' && (
              <div 
                className={cn("absolute inset-6 rounded-[1.5rem] pointer-events-none transition-all", borderStyles[state.border || 'none'])} 
                style={{ color: state.textColor, opacity: state.border === 'glow' ? 0.6 : 0.4 }} 
              />
            )}

            {/* Content Container */}
            <div className="relative z-10 space-y-10 max-w-lg">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.6 }}
                className="text-8xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
              >
                {state.emoji}
              </motion.div>

              <div className="space-y-6">
                {state.senderName && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <p className="text-xl font-bold italic tracking-wide" style={{ color: state.textColor, opacity: 0.7 }}>
                      Kjære deg, hilsen {state.senderName}
                    </p>
                    <div className="w-24 h-[1px] bg-current opacity-20" style={{ color: state.textColor }} />
                  </motion.div>
                )}
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-3xl md:text-5xl leading-[1.3] font-black tracking-tight"
                  style={{ color: state.textColor }}
                >
                  {/* Vis korttekst på valgt språk hvis mulig */}
                  {(() => {
                    // Finn type og index hvis meldingen matcher en av default-meldingene
                    let foundType: string | undefined;
                    let foundIdx: number | undefined;
                    for (const type of Object.keys(DEFAULT_MESSAGES)) {
                      const idx = DEFAULT_MESSAGES[type as keyof typeof DEFAULT_MESSAGES].indexOf(state.message);
                      if (idx !== -1) {
                        foundType = type;
                        foundIdx = idx;
                        break;
                      }
                    }
                    if (foundType && foundIdx !== undefined) {
                      // Forsøk å hente oversatt melding fra DEFAULT_MESSAGES for valgt språk
                      // Her kan du utvide med flere språk hvis du har flere DEFAULT_MESSAGES_X
                      if (state.language === 'en' && typeof DEFAULT_MESSAGES_EN !== 'undefined') {
                        // @ts-ignore
                        const arr = DEFAULT_MESSAGES_EN[foundType];
                        if (arr && arr[foundIdx]) return arr[foundIdx];
                      }
                      // Norsk er default
                      return DEFAULT_MESSAGES[foundType as keyof typeof DEFAULT_MESSAGES][foundIdx];
                    }
                    // Ellers vis meldingen som den er
                    return state.message;
                  })()}
                </motion.h2>
              </div>
            </div>

            {/* Postcard Lines - Bottom Right Decor */}
            <div className="absolute bottom-12 right-12 w-32 space-y-3 opacity-20 pointer-events-none">
               <div className="h-[1px] w-full bg-current" style={{ color: state.textColor }} />
               <div className="h-[1px] w-[80%] bg-current ml-auto" style={{ color: state.textColor }} />
               <div className="h-[1px] w-[60%] bg-current ml-auto" style={{ color: state.textColor }} />
            </div>

            {!isViewOnly && (
              <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-white/50 transition-all border border-white/50 shadow-sm flex items-center gap-2 group/btn"
              >
                <MailOpen className="w-5 h-5 text-zinc-800" />
                <span className="max-w-0 overflow-hidden group-hover/btn:max-w-xs transition-all duration-500 font-bold text-sm text-zinc-900">Forlat</span>
              </motion.button>
            )}

            {state.showIndicator && (
              <>
                <div className="absolute top-0 left-0 p-8 text-current opacity-10 pointer-events-none" style={{ color: state.textColor }}><Sparkle className="w-12 h-12" /></div>
                <div className="absolute bottom-0 right-0 p-8 text-current opacity-10 pointer-events-none" style={{ color: state.textColor }}><Sparkle className="w-12 h-12" /></div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flip Button fjernet */}
    </div>
  );
};
