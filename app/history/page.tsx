"use client";

import React from 'react';
import { SidebarIconExample } from '@/components/sidebar';
import { History } from '@/components/Pages/History';

export default function HistoryPage() {
  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <History />
      </main>
    </SidebarIconExample>
  );
}
