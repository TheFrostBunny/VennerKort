"use client";

import React from 'react';
import { SidebarIconExample } from '@/components/sidebar';
import { Settings } from '@/components/Pages/Settings';

export default function SettingsPage() {
  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <Settings />
      </main>
    </SidebarIconExample>
  );
}
