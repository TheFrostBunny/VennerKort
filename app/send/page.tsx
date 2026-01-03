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
import { useAuth } from '@/lib/appwrite/auth-context';
import { createCard, getCard } from '@/lib/appwrite/client';
import { toast } from 'sonner';

function SendContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const { user } = useAuth();
  
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
    confettiType: 'standard',

    envelopeStyle: 'classic',
    unlockAt: null,
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
  const CONFETTI_MAP = ['standard', 'hearts', 'stars', 'snow'];
  const ENVELOPES_MAP = ['classic', 'modern', 'vintage'];

  // Initialize from URL (Base64 or Appwrite ID) or Draft
  useEffect(() => {
    const code = searchParams.get('c');
    const cloudId = searchParams.get('id');
    const name = searchParams.get('name');

    if (cloudId) {
        // Load from Appwrite
        getCard(cloudId).then((doc) => {
            setIsViewOnly(true);
            setState({
                type: (doc.type as CardType) || 'friend',
                message: doc.message || '',
                senderName: doc.senderName || '',
                backgroundColor: doc.backgroundColor || '#ffb6c1',
                textColor: doc.textColor || '#ff1493',
                font: doc.font || FONT_MAP[0],
                border: doc.border || 'none',
                effect: doc.effect || 'none',
                emoji: doc.emoji || '😊',
                showIndicator: doc.showIndicator,
                confettiType: doc.confettiType || 'standard',
                envelopeStyle: doc.envelopeStyle || 'classic',
                unlockAt: doc.unlockAt || null,
            });
        }).catch(() => {
            toast.error("Fant ikke kortet", { description: "Linken kan være ugyldig eller utløpt." });
        });
    } else if (code) {
      try {
        // Decode Unicode Base64
        const json = decodeURIComponent(escape(atob(code)));
        const data = JSON.parse(json);
        
        setIsViewOnly(true);
        
        if (Array.isArray(data)) {
          const [n, tIdx, m, b, tc, f, bd, e, em, h, cType, eStyle, uAt] = data;
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
            confettiType: (CONFETTI_MAP[data[10]] as any) || 'standard',

            envelopeStyle: (ENVELOPES_MAP[data[11]] as any) || 'classic',
            unlockAt: uAt || null,
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
            confettiType: data.ct || 'standard',

            envelopeStyle: data.es || 'classic',
            unlockAt: data.uAt || null,
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
        confettiType: (searchParams.get('confetti') as any) || 'standard',

        envelopeStyle: (searchParams.get('env') as any) || 'classic',
        unlockAt: searchParams.get('unlockAt') || null,
      });
    } else {
      // Check for draft
      const savedDraft = localStorage.getItem('happysend_draft');
      if (savedDraft) {
        try {
          setState(JSON.parse(savedDraft));
        } catch (e) {
          console.error("Failed to load draft", e);
        }
      }
      setIsViewOnly(false);
      setHasOpened(false);
    }
  }, [searchParams]);

  // Save draft whenever state changes (only for creators)
  useEffect(() => {
    if (!isViewOnly && !isPreview) {
      localStorage.setItem('happysend_draft', JSON.stringify(state));
    }
  }, [state, isViewOnly, isPreview]);

  const updateState = (newState: Partial<CardState>) => {
    setState(prev => {
      const updated = { ...prev, ...newState };
      if (newState.type && newState.type !== prev.type) {
        // Only reset if current message is a default message
        const allDefaults = Object.values(DEFAULT_MESSAGES).flat();
        if (allDefaults.includes(prev.message)) {
          updated.message = DEFAULT_MESSAGES[newState.type][0];
        }
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

  const handleShare = useCallback(async () => {
    const url = new URL(window.location.origin + '/send');
    
    // Check if logged in for Cloud Save
    if (user) {
        try {
             // Save to Appwrite
             const doc = await createCard({
                 ...state,
                 senderName: state.senderName || user.name, // Fallback to user name
             });
             url.searchParams.set('id', doc.$id);
             
             navigator.clipboard.writeText(url.toString()).then(() => {
                setIsLinkCopied(true);
                toast.success("Link kopiert!", { description: "Kortet er lagret i skyen." });
                setTimeout(() => setIsLinkCopied(false), 3000);
             });
             return;
        } catch (error) {
            console.error(error);
            toast.error("Kunne ikke lagre til skyen", { description: "Bruker standard link i stedet." });
            // Fallthrough to standard logic on error
        }
    }

    // Standard Logic (Base64)
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

      state.showIndicator ? 1 : 0,
      CONFETTI_MAP.indexOf(state.confettiType),
      ENVELOPES_MAP.indexOf(state.envelopeStyle),
      state.unlockAt // index 12
    ];

    const encodedData = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    url.searchParams.set('c', encodedData);

    navigator.clipboard.writeText(url.toString()).then(() => {
      setIsLinkCopied(true);
      toast.success("Link kopiert!"); // using sonner
      const sentHistory = JSON.parse(localStorage.getItem('happysend_history') || '[]');
      const newSentCard = {
        ...state,
        id: Date.now().toString(),
        sentAt: new Date().toISOString()
      };
      localStorage.setItem('happysend_history', JSON.stringify([...sentHistory, newSentCard]));
      setTimeout(() => setIsLinkCopied(false), 3000);
    });
  }, [state, user]);

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

  const handlePreview = () => {
    setIsPreview(true);
    setHasOpened(false);
  };

  const navHeader = (
    <div className="p-4 flex items-center justify-between border-b bg-white dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="size-8 bg-pink-500 rounded-lg flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" className="size-6 object-contain" />
        </div>
        <span className="font-bold text-sm tracking-tight">HappySend</span>
      </div>
      
      {isPreview && (
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-[10px] font-black uppercase tracking-widest border border-pink-200 dark:border-pink-800/50">
            Forhåndsvisning
          </div>
          <button 
            onClick={() => setIsPreview(false)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
          >
            Tilbake til redigering
          </button>
        </div>
      )}
    </div>
  );

  const content = (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-950">
      {isPreview && navHeader}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        <div className="flex-1 flex flex-col items-center justify-center p-2 md:p-4 relative overflow-hidden min-h-0 bg-zinc-50/30 dark:bg-zinc-950/30">
          <div className="w-full max-w-4xl z-10 py-4 flex flex-col items-center">
            <GreetingCard 
              state={state} 
              isViewOnly={isViewOnly || isPreview} 
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

        {!isViewOnly && !isPreview && (
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
              onPreview={handlePreview}
              onRandomMessage={handleRandomMessage}
              isLinkCopied={isLinkCopied}
            />
          </motion.div>
        )}
      </div>
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
