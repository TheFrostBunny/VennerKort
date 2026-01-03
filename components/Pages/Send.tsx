"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkle, MailOpen, Mail, Lock as LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardState } from '../CardCustomizer';
import confetti from 'canvas-confetti';

interface SendProps {
  state: CardState;
  isViewOnly?: boolean;
  onOpen?: () => void;
}

export const Send: React.FC<SendProps> = ({ state, isViewOnly = false, onOpen }) => {
  const [isOpen, setIsOpen] = useState(!isViewOnly);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      onOpen?.();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ffb6c1', '#dda0dd', '#ff1493', '#f472b6', '#db2777'],
        ticks: 300,
        gravity: 0.8,
        scalar: 1.2
      });
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
            onClick={handleOpen}
          >
            {/* Envelope Back */}
            <div className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
               {/* Paper Texture Overlay */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />
               
               {/* Envelope Flap (Static back part) */}
               <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[142%] h-[142%] bg-zinc-50 dark:bg-zinc-800/10 rotate-45 transform origin-top border-b border-zinc-200/50 dark:border-zinc-700/50" />
               </div>

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
                    {state.type === 'love' ? (
                      <Heart className="w-20 h-20 text-pink-500 fill-pink-500 relative z-10" />
                    ) : state.type === 'crush' ? (
                      <LockIcon className="w-20 h-20 text-purple-500 relative z-10" />
                    ) : (
                      <Mail className="w-20 h-20 text-blue-500 relative z-10" />
                    )}
                  </motion.div>

                  <div className="text-center px-8">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-2 tracking-tight">
                      {isViewOnly ? `Du har fått et kort!` : 'Klikk for å se kortet'}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">
                      {isViewOnly ? `Spesielt levert fra ${state.senderName || 'en venn'}` : 'Se hvordan din hilsen ser ut'}
                    </p>
                  </div>
               </div>

               {/* Airmail Stripes */}
               <div className="absolute bottom-0 left-0 w-full h-4 flex opacity-30">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex-1 -skew-x-12",
                        i % 2 === 0 ? "bg-red-400/50" : "bg-blue-400/50"
                      )} 
                    />
                  ))}
               </div>
            </div>

            {/* Pulsing opening indicator - Only show on hover and if enabled */}
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
            
            {/* Ambient Shadow/Highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none" />

            {/* Background Effects */}
            {getEffectOverlay()}
            
            {/* High-End Border */}
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
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-xl font-bold italic tracking-wide"
                    style={{ color: state.textColor, opacity: 0.7 }}
                  >
                    Kjære deg, hilsen {state.senderName}
                  </motion.p>
                )}
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-3xl md:text-5xl leading-[1.3] font-black tracking-tight"
                  style={{ color: state.textColor }}
                >
                  {state.message}
                </motion.h2>
              </div>
            </div>

            {/* Back to envelope for creators */}
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

            {/* Corner Decorators - Only show if enabled */}
            {state.showIndicator && (
              <>
                <div className="absolute top-0 left-0 p-8 text-current opacity-10 pointer-events-none" style={{ color: state.textColor }}><Sparkle className="w-12 h-12" /></div>
                <div className="absolute bottom-0 right-0 p-8 text-current opacity-10 pointer-events-none" style={{ color: state.textColor }}><Sparkle className="w-12 h-12" /></div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
