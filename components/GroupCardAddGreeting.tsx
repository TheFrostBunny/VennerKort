import React, { useState } from "react";
import { GroupCard, addGreetingToGroupCard } from "@/lib/group-card";

interface GroupCardAddGreetingProps {
  card: GroupCard;
  onAdd: (card: GroupCard) => void;
}

export const GroupCardAddGreeting: React.FC<GroupCardAddGreetingProps> = ({ card, onAdd }) => {
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) {
      setError("Du må fylle ut navn og melding.");
      return;
    }
    setError("");
    const updated = addGreetingToGroupCard(card, { senderName, message });
    onAdd(updated);
    setSenderName("");
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8 p-6 bg-white/60 rounded-2xl shadow">
      <h3 className="text-lg font-bold mb-4">Legg til din hilsen</h3>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Ditt navn"
          value={senderName}
          onChange={e => setSenderName(e.target.value)}
          className="w-full p-2 rounded border border-zinc-300"
        />
      </div>
      <div className="mb-3">
        <textarea
          placeholder="Din hilsen..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full p-2 rounded border border-zinc-300 min-h-[60px]"
        />
      </div>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:bg-blue-600 transition">Legg til</button>
    </form>
  );
}
