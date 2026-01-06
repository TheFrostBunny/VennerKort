"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n/i18n-context";


const wikiSections = [
  {
    section: "wiki.wiki_Sections.sending",
    items: [
      { id: "1", title: "wiki.what" },
      { id: "2", title: "wiki.how_create" },
      { id: "3", title: "wiki.how_receive" },
    ],
  },
  {
    section: "wiki.wiki_Sections.privacy",
    items: [
      { id: "4", title: "wiki.free" },
      { id: "5", title: "wiki.privacy" },
      { id: "6", title: "wiki.contact" },
    ],
  },
];

export default function WikiRootPage() {
  const { t } = useI18n();
  const router = useRouter();
  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-zinc-950">
      <div className="flex-1 flex flex-col gap-6 p-4 md:p-6 max-w-4xl mx-auto w-full transition-colors bg-white dark:bg-zinc-950 overflow-y-auto scrollbar-hide">
        <div className="mb-4">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>{t("nav.BackToFrontPage")}</span>
          </button>
        </div>
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{t("nav.Wiki")}</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("common.select_service")}</p>
        </div>
        <div className="mt-6 space-y-8">
          {wikiSections.map((section) => (
            <section key={section.section}>
              <h2 className="text-lg font-bold mb-3 text-zinc-800 dark:text-zinc-200">{t(section.section)}</h2>
              <ul className="space-y-2">
                {section.items.map((page) => (
                  <li key={page.id}>
                    <Link href={`/wiki/${page.id}`} className="block px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors font-medium text-zinc-900 dark:text-zinc-100">
                      {t(page.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
