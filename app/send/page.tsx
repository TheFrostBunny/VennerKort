"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GreetingCard } from '@/components/GreetingCard';
import { CardCustomizer, CardState, CardType } from '@/components/CardCustomizer';
import { DEFAULT_MESSAGES } from '@/lib/constants';
import { useI18n } from '@/lib/i18n/i18n-context';
import { SidebarIconExample } from '@/components/sidebar';

function SendContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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
    showIndicator: false,
  });

  // Maps for ultra-compact encoding
  const TYPE_MAP = ['friend', 'love', 'crush'];
  const FONT_MAP = [
    'var(--font-dancing-script, cursive)',
    'var(--font-pacifico, cursive)',
    'var(--font-quicksand, sans-serif)',
    'var(--font-inter, sans-serif)'
  ];
  const BORDER_MAP = ['none', 'double', 'dashed', 'glow'];
  const EFFECT_MAP = ['none', 'hearts', 'sparkles', 'dots', 'waves'];

  // Initialize from URL
  useEffect(() => {
    const code = searchParams.get('c');
    const name = searchParams.get('name');

    if (code) {
      try {
        // Decode Unicode Base64
        const json = decodeURIComponent(escape(atob(code)));
        const data = JSON.parse(json);
        
        setIsViewOnly(true);
        
        if (Array.isArray(data)) {
          const [n, tIdx, m, b, tc, f, bd, e, em, h] = data;
          setState({
            senderName: n || '',
            type: (TYPE_MAP[tIdx] as CardType) || 'friend',
            message: m || '',
            backgroundColor: b ? `#${b}` : '#ffb6c1',
            textColor: tc ? `#${tc}` : '#ff1493',
            font: FONT_MAP[f] || FONT_MAP[0],
            border: BORDER_MAP[bd] || 'none',
            effect: EFFECT_MAP[e] || 'none',
            emoji: em || '😊',
            showIndicator: h !== 0,
          });
        } else {
          setState({
            type: data.t || 'friend',
            message: data.m || '',
            senderName: data.n || '',
            backgroundColor: data.b || '#ffb6c1',
            textColor: data.tc || '#ff1493',
            font: data.f || FONT_MAP[0],
            border: data.bd || 'none',
            effect: data.e || 'none',
            emoji: data.em || '😊',
            showIndicator: data.h !== false,
          });
        }
      } catch (e) {
        console.error("Failed to decode card data", e);
      }
    } else if (name) {
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
        showIndicator: searchParams.get('hint') !== 'false',
      });
    } else {
      setIsViewOnly(false);
      setHasOpened(false);
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
    const url = new URL(window.location.origin + '/send');
    const data = [
      state.senderName,
      TYPE_MAP.indexOf(state.type),
      state.message,
      state.backgroundColor.replace('#', ''),
      state.textColor.replace('#', ''),
      FONT_MAP.indexOf(state.font),
      BORDER_MAP.indexOf(state.border),
      EFFECT_MAP.indexOf(state.effect),
      state.emoji,
      state.showIndicator ? 1 : 0
    ];

    const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    url.searchParams.set('c', encodedData);

    navigator.clipboard.writeText(url.toString()).then(() => {
      setIsLinkCopied(true);
      const sentHistory = JSON.parse(localStorage.getItem('happysend_history') || '[]');
      const newSentCard = {
        ...state,
        id: Date.now().toString(),
        sentAt: new Date().toISOString()
      };
      localStorage.setItem('happysend_history', JSON.stringify([...sentHistory, newSentCard]));
      setTimeout(() => setIsLinkCopied(false), 3000);
    });
  }, [state]);

  const handleSave = () => {
    const savedCards = JSON.parse(localStorage.getItem('happysend_received') || '[]');
    const newSavedCard = {
      ...state,
      id: Date.now().toString(),
      receivedAt: new Date().toISOString()
    };
    localStorage.setItem('happysend_received', JSON.stringify([...savedCards, newSavedCard]));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const content = (
    <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
      <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden min-h-0 bg-zinc-50/30 dark:bg-zinc-950/30">
        <div className="w-full max-w-4xl z-10 py-4 flex flex-col items-center">
          <GreetingCard 
            state={state} 
            isViewOnly={isViewOnly} 
            onOpen={() => setHasOpened(true)}
          />
          
          <AnimatePresence>
            {isViewOnly && hasOpened && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center"
              >
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                    <button 
                      onClick={() => {
                        setIsViewOnly(false);
                        setHasOpened(false);
                        router.push('/send');
                      }}
                      className="flex items-center gap-2 text-zinc-400 hover:text-pink-500 transition-colors text-sm font-medium"
                    >
                      <Sparkles className="w-4 h-4" />
                      {t('card_app.create_own')}
                    </button>

                    <span className="hidden sm:block w-1 h-1 rounded-full bg-zinc-300" />

                    <button 
                      onClick={handleSave}
                      disabled={isSaved}
                      className={cn(
                        "flex items-center gap-2 transition-colors text-sm font-medium",
                        isSaved ? "text-green-500" : "text-zinc-400 hover:text-blue-500"
                      )}
                    >
                      <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
                      {isSaved ? t('card_app.card_saved') : t('card_app.save_card')}
                    </button>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-1/4 -left-20 w-64 h-64 bg-pink-200/5 blur-[100px] rounded-full" />
           <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-200/5 blur-[120px] rounded-full" />
        </div>
      </div>

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
    </main>
  );

  if (isViewOnly) {
    return content;
  }

  return (
    <SidebarIconExample>
      {content}
    </SidebarIconExample>
  );
}

export default function SendPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-white dark:bg-zinc-950 min-h-screen" />}>
      <SendContent />
    </Suspense>
  );
}
