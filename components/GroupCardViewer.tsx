import React from "react";
import { GroupCard } from "@/lib/group-card";

interface GroupCardViewerProps {
  card: GroupCard;
}

export const GroupCardViewer: React.FC<GroupCardViewerProps> = ({ card }) => {
  return (
    <div
      className="rounded-2xl shadow-lg p-8 max-w-xl mx-auto"
      style={{ backgroundColor: card.backgroundColor, color: card.textColor, fontFamily: card.font }}
    >
      <h2 className="text-2xl font-bold mb-6">Gratulasjonskort fra flere!</h2>
      <div className="space-y-6">
        {card.greetings.length === 0 ? (
          <div className="text-zinc-400 italic">Ingen hilsener enda.</div>
        ) : (
          card.greetings.map((greeting, idx) => (
            <div key={idx} className="bg-white/40 rounded-xl p-4 shadow">
              <div className="font-semibold text-lg mb-2">{greeting.senderName}</div>
              <div className="text-base">{greeting.message}</div>
              <div className="text-xs text-zinc-500 mt-2">{new Date(greeting.createdAt).toLocaleString()}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
