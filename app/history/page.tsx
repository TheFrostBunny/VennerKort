"use client";

import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Clock, PlusCircle, Trash2, ExternalLink } from 'lucide-react';
import { SidebarIconExample } from '@/components/sidebar';
import { useI18n } from '@/lib/i18n/i18n-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CardState } from '@/components/CardCustomizer';

interface SentCard extends CardState {
  id: string;
  sentAt: string;
}

export default function HistoryPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [sentCards, setSentCards] = useState<SentCard[]>([]);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('happysend_history') || '[]');
    setSentCards(cards);
  }, []);

  const handleDelete = (id: string) => {
    const updated = sentCards.filter(c => c.id !== id);
    localStorage.setItem('happysend_history', JSON.stringify(updated));
    setSentCards(updated);
  };

  const handleOpen = (card: SentCard) => {
    // Generate the URL using the same logic as handleShare in CardApp
    // This is a simplified version for opening from history
    const data = [
      card.type === 'friend' ? 0 : card.type === 'love' ? 1 : 2,
      card.message,
      card.senderName,
      card.backgroundColor,
      card.textColor,
      // Map these back to indices if needed, or just pass as is for simplicity if the URL handler supports it
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
      console.error("Failed to generate history link", e);
    }
  };

  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex-1 flex flex-col gap-4 p-4 md:p-6 max-w-6xl mx-auto w-full transition-colors bg-white dark:bg-zinc-950 overflow-hidden h-full">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <HistoryIcon className="w-6 h-6 text-purple-500" />
              {t('customizer.history_title')}
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('dashboard.history_desc')}</p>
          </div>

          {sentCards.length > 0 ? (
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                {sentCards.map((card) => (
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
                          className="p-1.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-purple-500 shadow-sm transition-colors"
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
                        {new Date(card.sentAt).toLocaleDateString()}
                      </p>
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 truncate text-sm">
                        Til: {card.senderName || 'En venn'}
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
                <Clock className="w-8 h-8 text-zinc-400 dark:text-zinc-600" />
              </div>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {t('dashboard.no_history')}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mb-6">
                Du har ikke sendt noen kort ennå. Spre litt glede nå ved å lage ditt første kort!
              </p>
              
              <Button 
                onClick={() => router.push('/send')}
                className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl h-10 px-6 text-sm font-bold shadow-lg shadow-purple-500/20 active:scale-95 transition-all"
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
