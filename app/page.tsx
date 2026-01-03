"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Sparkles } from 'lucide-react';
import { SidebarIconExample } from '@/components/sidebar';
import { useI18n } from '@/lib/i18n/i18n-context';

export default function RootDashboardPage() {
  const router = useRouter();
  const { t } = useI18n();

  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex-1 flex flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto w-full transition-colors bg-white dark:bg-zinc-950 overflow-y-auto scrollbar-hide">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{t('common.welcome')}</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('common.select_service')}</p>
          </div>
          
          <div className="grid auto-rows-min gap-6 md:grid-cols-3 text-left">
            <div 
              onClick={() => router.push('/send')}
              className="group cursor-pointer p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-pink-200 dark:hover:border-pink-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center text-pink-600 dark:text-pink-400 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-zinc-900 dark:text-zinc-100">{t('dashboard.send_card')}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('dashboard.send_card_desc')}</p>
            </div>
            
            <div 
              onClick={() => router.push('/receive')}
              className="group cursor-pointer p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/30 transition-all font-inherit"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-zinc-900 dark:text-zinc-100">{t('dashboard.receive_card')}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('dashboard.receive_card_desc')}</p>
            </div>

            <div 
              onClick={() => router.push('/history')}
              className="group cursor-pointer p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-purple-200 dark:hover:border-purple-500/30 transition-all font-inherit"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1 text-zinc-900 dark:text-zinc-100">{t('dashboard.history')}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('dashboard.history_desc')}</p>
            </div>
          </div>

          <div className="flex-1 min-h-[150px] bg-zinc-50/50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-600 mt-2 pb-6">
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-medium">{t('common.coming_soon')}</p>
            </div>
          </div>
        </div>
      </main>
    </SidebarIconExample>
  );
}
