"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SidebarIconExample } from '@/components/sidebar';
import { Dashboard } from '@/components/Pages/Dashboard';
import { CardApp } from '@/components/Pages/CardApp';

export default function VennerKortPage() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <main className="flex-1 bg-white dark:bg-zinc-950 min-h-screen" />;
  }

  const isViewOnly = !!searchParams.get('name');
  const activeTab = searchParams.get('tab') || (isViewOnly ? 'send' : 'dashboard');

  const content = (
    <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
      {activeTab === 'send' ? (
        <CardApp isViewOnlyInitial={isViewOnly} />
      ) : (
        <Dashboard onStartSend={() => window.location.href = '/?tab=send'} />
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
