"use client";

import React from 'react';
import { History, Sparkles, Zap, Package, ChevronRight, Clock } from 'lucide-react';
import { SidebarIconExample } from '@/components/sidebar';
import { useI18n } from '@/lib/i18n/i18n-context';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ChangelogPage() {
  const { t } = useI18n();
  const router = useRouter();

  const releases = [
    {
      version: "v1.1.0",
      date: t('changelog.v1_1_0.date'),
      description: t('changelog.v1_1_0.desc'),
      type: 'major',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-500/10'
    },
    {
      version: "v1.0.1",
      date: t('changelog.v1_0_1.date'),
      description: t('changelog.v1_0_1.desc'),
      type: 'fix',
      icon: <Zap className="w-4 h-4" />,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-500/10'
    },
    {
      version: "v1.0.0",
      date: t('changelog.v1_0_0.date'),
      description: t('changelog.v1_0_0.desc'),
      type: 'major',
      icon: <Sparkles className="w-4 h-4" />,
      color: 'text-pink-500 bg-pink-50 dark:bg-pink-500/10'
    },
    {
      version: "v0.5.0",
      date: t('changelog.v0_5_0.date'),
      description: t('changelog.v0_5_0.desc'),
      type: 'initial',
      icon: <Package className="w-4 h-4" />,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10'
    }
  ];

  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <div className="flex-1 flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full transition-colors bg-white dark:bg-zinc-950 overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <History className="w-6 h-6 text-zinc-400" />
                {t('changelog.title')}
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">En oversikt over alle oppdateringer og forbedringer.</p>
            </div>
            <button 
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">
            {releases.map((release, index) => (
              <div key={release.version} className="relative flex items-start gap-6 group">
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full shrink-0 z-10 border-4 border-white dark:border-zinc-950 transition-transform group-hover:scale-110",
                  release.color
                )}>
                  {release.icon}
                </div>
                
                <div className="flex-1 pt-1 pb-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{release.version}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        {release.type === 'major' ? 'Hovedversjon' : release.type === 'fix' ? 'Oppdatering' : 'Lansering'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {release.date}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    {release.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </SidebarIconExample>
  );
}
