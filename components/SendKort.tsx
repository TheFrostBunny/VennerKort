"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkle, MailOpen, Mail, Lock as LockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CardState, CardType } from './CardCustomizer';
import confetti from 'canvas-confetti';

interface SendKortProps {
  state: CardState;
  isViewOnly?: boolean;
}

export const SendKort: React.FC<SendKortProps> = ({ state, isViewOnly = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isViewOnly && !isOpen) {
      // Small delay for drama
    }
  }, [isViewOnly, isOpen]);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ffb6c1', '#dda0dd', '#ff1493']
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
    simple: "border-4 border-current opacity-30",
    hearts: "border-[12px] border-double border-current opacity-30",
    dotted: "border-4 border-dotted border-current opacity-30",
  };

  const getEffectOverlay = () => {
    switch (state.effect) {
      case 'hearts':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <Heart 
                key={i} 
                className="absolute text-current" 
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  transform: `scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`
                }} 
              />
            ))}
          </div>
        );
      case 'sparkles':
        return (
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <Sparkle 
                key={i} 
                className="absolute text-current" 
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  transform: `scale(${0.3 + Math.random()})`
                }} 
              />
            ))}
          </div>
        );
      case 'dots':
        return <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '15px 15px' }} />;
      case 'waves':
        return <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor), linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%, currentColor)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex items-center justify-center p-4 min-h-[400px] w-full">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              rotateX: mousePosition.y * 20,
              rotateY: mousePosition.x * 20,
            }}
            exit={{ scale: 1.1, opacity: 0, rotateY: 90 }}
            whileHover={{ scale: 1.02 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
            onClick={handleOpen}
            className="group relative w-full max-w-[400px] aspect-[4/3] bg-white cursor-pointer shadow-2xl rounded-lg overflow-hidden border-2 border-zinc-100 flex flex-col items-center justify-center gap-4 transition-shadow hover:shadow-pink-200/50"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {state.type === 'love' ? (
                <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
              ) : state.type === 'crush' ? (
                <LockIcon className="w-16 h-16 text-purple-500" />
              ) : (
                <Mail className="w-16 h-16 text-blue-500" />
              )}
            </motion.div>
            
            <div className="text-center px-6">
              <h3 className="text-lg font-bold text-zinc-800 mb-1">
                {isViewOnly ? `Du har fått et kort!` : 'Trykk for å forhåndsvise'}
              </h3>
              <p className="text-sm text-zinc-500">
                {isViewOnly ? `Fra ${state.senderName || 'en venn'}` : 'Klikk for å se hvordan det ser ut'}
              </p>
            </div>

            {/* Decorative stripes like an airmail envelope */}
            <div className="absolute bottom-0 left-0 w-full h-8 flex">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex-1 -skew-x-12",
                    i % 2 === 0 ? "bg-pink-100" : "bg-blue-50"
                  )} 
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative w-full max-w-[600px] min-h-[400px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center"
            style={{ 
              backgroundColor: state.backgroundColor,
              fontFamily: state.font
            }}
          >
            {/* Background Effects */}
            {getEffectOverlay()}
            
            {/* Border */}
            <div className={cn("absolute inset-4 rounded-2xl pointer-events-none transition-all", borderStyles[state.border])} style={{ color: state.textColor }} />

            {/* Content */}
            <div className="relative z-10 space-y-6 max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-6xl drop-shadow-lg"
              >
                {state.emoji}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
                style={{ color: state.textColor }}
              >
                {state.senderName && (
                  <p className="text-xl font-medium opacity-80">
                    Kjære deg, fra {state.senderName}
                  </p>
                )}
                <h2 className="text-2xl md:text-3xl leading-relaxed font-bold">
                  {state.message}
                </h2>
              </motion.div>
            </div>

            {/* Back button for editor */}
            {!isViewOnly && (
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/50 hover:bg-white transition-colors"
              >
                <MailOpen className="w-5 h-5 text-zinc-600" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
