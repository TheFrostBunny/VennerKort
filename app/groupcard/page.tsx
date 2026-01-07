"use client";
import React, { useState } from "react";
import { GroupCard } from "@/lib/group-card";
import { GroupCardViewer } from "@/components/GroupCardViewer";
import { GroupCardAddGreeting } from "@/components/GroupCardAddGreeting";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialCard: GroupCard = {
  id: "demo-1",
  greetings: [],
  backgroundColor: "#f0f4ff",
  textColor: "#1a1a1a",
  font: "var(--font-inter, sans-serif)",
  border: "double",
  effect: "hearts",
  confettiType: "standard",
  envelopeStyle: "classic",
  unlockAt: null,
  language: "nb"
};

export default function GroupCardPage() {
  const [card, setCard] = useState<GroupCard>(initialCard);
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  // Generer en enkel share-link basert på kortets id
  React.useEffect(() => {
    setShareUrl(`${window.location.origin}/groupcard?id=${card.id}`);
  }, [card.id]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Group Card Demo</h1>
      <div className="flex flex-col items-center mb-6">
        <Button
          onClick={() => setIsGroupMode(true)}
          className="mb-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold"
        >
          Gjør om til gruppe-kort
        </Button>
        {isGroupMode && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="px-2 py-1 rounded border border-zinc-300 w-[320px]"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-500 text-white px-3 py-2 rounded flex items-center gap-1 font-bold hover:bg-blue-600 transition"
            >
              <Copy className="w-4 h-4" />
              {isCopied ? "Kopiert!" : "Kopier link"}
            </button>
          </div>
        )}
        {isGroupMode && (
          <div className="text-xs text-zinc-500 mt-2">Del denne linken med alle som skal legge til sin hilsen.</div>
        )}
      </div>
      {isGroupMode && <GroupCardAddGreeting card={card} onAdd={setCard} />}
      <GroupCardViewer card={card} />
    </div>
  );
}
