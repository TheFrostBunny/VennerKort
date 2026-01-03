"use client";

import React from 'react';
import { SidebarIconExample } from '@/components/sidebar';
import { Changelog } from '@/components/Pages/Changelog';

export default function ChangelogPage() {
  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <Changelog />
      </main>
    </SidebarIconExample>
  );
}
