"use client";
import Link from "next/link";
import React from "react";
import { useI18n } from "@/lib/i18n/i18n-context";
import { ArrowLeft } from "lucide-react";

interface WikiPageViewerProps {
  pageId: string;
}

const wikiPages = [
  { id: "1", title: "wiki.what", content: "wiki.what_desc" },
  { id: "2", title: "wiki.how_create", content: "wiki.how_create_desc" },
  { id: "3", title: "wiki.how_receive", content: "wiki.how_receive_desc" },
  { id: "4", title: "wiki.free", content: "wiki.free_desc" },
  { id: "5", title: "wiki.privacy", content: "wiki.privacy_desc" },
  { id: "6", title: "wiki.contact", content: "wiki.contact_desc" },
];


export const WikiPageViewer: React.FC<WikiPageViewerProps> = ({ pageId }) => {
  const { t } = useI18n();
  const page = wikiPages.find((p) => p.id === pageId);

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-950">
      <div className="flex-1 flex flex-col gap-8 p-4 md:p-10 max-w-2xl w-full transition-colors bg-white dark:bg-zinc-950 overflow-y-auto scrollbar-hide md:items-start md:mx-0">
        <div className="flex items-center gap-2 mb-2">
          <Link href="/wiki" className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors font-medium shadow-sm">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{t('nav.backToOverview') || 'Tilbake til oversikten'}</span>
          </Link>
        </div>
        <div className="space-y-4 ">
          {!page && (
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">{t('common.loading') || 'Siden ble ikke funnet'}</h1>
          )}
          {page && (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">{t(page.title)}</h1>
              <div className="prose prose-zinc dark:prose-invert max-w-none text-base leading-relaxed bg-zinc-50 dark:bg-zinc-900 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                {t(page.content)}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};
