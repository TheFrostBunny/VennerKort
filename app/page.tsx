"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { SidebarIconExample } from '@/components/sidebar';
import { Dashboard } from '@/components/Pages/Dashboard';

export default function RootDashboardPage() {
  const router = useRouter();

  return (
    <SidebarIconExample>
      <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
        <Dashboard 
          onStartSend={() => router.push('/send')} 
          onNavigate={(path) => router.push(`/${path}`)}
        />
      </main>
    </SidebarIconExample>
  );
}
