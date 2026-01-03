"use client";

import React, { useState, useEffect } from 'react';
import { MailOpen, Inbox, PlusCircle, Trash2, ExternalLink } from 'lucide-react';
import { SidebarIconExample } from '@/components/sidebar';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CardState } from '@/components/CardCustomizer';

interface SavedCard extends CardState {
  id: string;
  receivedAt: string;
}

export default function ReceivePage() {
  const { t } = useI18n();
  const router = useRouter();
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('happysend_received') || '[]');
    setSavedCards(cards);
  }, []);

  const handleDelete = (id: string) => {
    const updated = savedCards.filter(c => c.id !== id);
    localStorage.setItem('happysend_received', JSON.stringify(updated));
    setSavedCards(updated);
  };

  const handleOpen = (card: SavedCard) => {
    // Generate the URL using the same logic as handleShare in CardApp
    const data = [
      card.type === 'friend' ? 0 : card.type === 'love' ? 1 : 2,
      card.message,
      card.senderName,
      card.backgroundColor,
      card.textColor,
      card.font, 
      card.border,
      card.effect,
      card.emoji,
      card.showIndicator ? 1 : 0
    ];
    
    try {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      router.push(`/send?c=${code}`);
    } catch (e) {
      console.error("Failed to generate receive link", e);
    }
  };

  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex-1 flex flex-col gap-4 p-4 md:p-6 max-w-6xl mx-auto w-full transition-colors bg-white dark:bg-zinc-950 overflow-hidden h-full">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <MailOpen className="w-6 h-6 text-pink-500" />
              {t('customizer.receive_title')}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('dashboard.receive_card_desc')}</p>
          </div>

          {savedCards.length > 0 ? (
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                {savedCards.map((card) => (
                  <div 
                    key={card.id}
                    className="group relative p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    style={{ backgroundColor: `${card.backgroundColor}15` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{card.emoji}</div>
                      <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpen(card)}
                          className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 shadow-sm transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(card.id)}
                          className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-red-500 shadow-sm transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        {new Date(card.receivedAt).toLocaleDateString()}
                      </p>
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 truncate text-sm">
                        {card.senderName || 'En venn'}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 italic">
                        "{card.message}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/50 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <Inbox className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {t('dashboard.no_received_cards')}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mb-6">
                Du har ikke lagret noen kort ennå. Når du åpner et kort du har fått, kan du trykke på hjertet for å lagre det her!
              </p>
              
              <Button 
                onClick={() => router.push('/send')}
                className="bg-pink-500 hover:bg-pink-600 text-white rounded-xl h-10 px-6 text-sm font-bold shadow-lg shadow-pink-500/20 active:scale-95 transition-all"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {t('card_app.create_own')}
              </Button>
            </div>
          )}
        </div>
      </main>
    </SidebarIconExample>
  );
}
