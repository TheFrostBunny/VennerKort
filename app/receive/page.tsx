"use client";

import React from 'react';
import { SidebarIconExample } from '@/components/sidebar';
import { Receive } from '@/components/Pages/Receive';

export default function ReceivePage() {
  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <Receive />
      </main>
    </SidebarIconExample>
  );
}
