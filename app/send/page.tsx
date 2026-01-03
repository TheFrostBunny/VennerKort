"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SidebarIconExample } from '@/components/sidebar';
import { CardApp } from '@/components/Pages/CardApp';

function SendContent() {
  const searchParams = useSearchParams();
  const isViewOnly = !!searchParams.get('name');

  const content = (
    <main className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white dark:bg-zinc-950">
      <CardApp isViewOnlyInitial={isViewOnly} />
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

export default function SendPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-white dark:bg-zinc-950 min-h-screen" />}>
      <SendContent />
    </Suspense>
  );
}
