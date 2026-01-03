"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SendKort } from '@/components/SendKort';
import { CardCustomizer, CardState, CardType } from '@/components/CardCustomizer';
import { DEFAULT_MESSAGES } from '@/lib/constants';

interface CardAppProps {
  isViewOnlyInitial?: boolean;
}

export const CardApp: React.FC<CardAppProps> = ({ isViewOnlyInitial = false }) => {
  const searchParams = useSearchParams();
  const [isViewOnly, setIsViewOnly] = useState(isViewOnlyInitial);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  
  const [state, setState] = useState<CardState>({
    type: 'friend',
    message: DEFAULT_MESSAGES.friend[0],
    senderName: '',
    backgroundColor: '#ffb6c1',
    textColor: '#ff1493',
    font: 'var(--font-dancing-script, cursive)',
    border: 'none',
    effect: 'none',
    emoji: '😊',
  });

  // Initialize from URL
  useEffect(() => {
    const name = searchParams.get('name');
    if (name) {
      setIsViewOnly(true);
      setState({
        type: (searchParams.get('type') as CardType) || 'friend',
        message: searchParams.get('message') || '',
        senderName: name,
        backgroundColor: searchParams.get('color') || '#ffb6c1',
        textColor: searchParams.get('textColor') || '#ff1493',
        font: searchParams.get('font') || 'var(--font-dancing-script, cursive)',
        border: searchParams.get('border') || 'none',
        effect: searchParams.get('effect') || 'none',
        emoji: searchParams.get('emoji') || '😊',
      });
    }
  }, [searchParams]);

  const updateState = (newState: Partial<CardState>) => {
    setState(prev => {
      const updated = { ...prev, ...newState };
      if (newState.type && newState.type !== prev.type) {
        updated.message = DEFAULT_MESSAGES[newState.type][0];
      }
      return updated;
    });
  };

  const handleRandomMessage = () => {
    const pool = DEFAULT_MESSAGES[state.type];
    let newMessage;
    do {
      newMessage = pool[Math.floor(Math.random() * pool.length)];
    } while (newMessage === state.message && pool.length > 1);
    updateState({ message: newMessage });
  };

  const handleShare = useCallback(() => {
    const url = new URL(window.location.href.split('?')[0]);
    url.searchParams.set('name', state.senderName || 'En venn');
    url.searchParams.set('type', state.type);
    url.searchParams.set('message', state.message);
    url.searchParams.set('color', state.backgroundColor);
    url.searchParams.set('textColor', state.textColor);
    url.searchParams.set('font', state.font);
    url.searchParams.set('border', state.border);
    url.searchParams.set('effect', state.effect);
    url.searchParams.set('emoji', state.emoji);

    navigator.clipboard.writeText(url.toString()).then(() => {
      setIsLinkCopied(true);
      setTimeout(() => setIsLinkCopied(false), 3000);
    });
  }, [state]);

  return (
    <>
      {/* Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-y-auto min-h-0 bg-zinc-50/30 dark:bg-zinc-950/30">
        {/* Card Container */}
        <div className="w-full max-w-4xl z-10 py-12">
          <SendKort state={state} isViewOnly={isViewOnly} />
        </div>

        {/* Back Button for recipients who want to make their own */}
        {isViewOnly && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => {
              window.location.href = window.location.pathname;
            }}
            className="mt-8 flex items-center gap-2 text-zinc-400 hover:text-pink-500 transition-colors text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" /> Lag ditt eget kort
          </motion.button>
        )}

        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-1/4 -left-20 w-64 h-64 bg-pink-200/5 blur-[100px] rounded-full" />
           <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-200/5 blur-[120px] rounded-full" />
        </div>
      </div>

      {/* Side Customizer (Hidden in view only) */}
      <AnimatePresence>
        {!isViewOnly && (
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full md:w-80 h-full z-20"
          >
            <CardCustomizer 
              state={state} 
              onChange={updateState} 
              onShare={handleShare}
              onRandomMessage={handleRandomMessage}
              isLinkCopied={isLinkCopied}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
