export interface GroupGreeting {
  senderName: string;
  message: string;
  createdAt: string;
}

export interface GroupCard {
  id: string;
  greetings: GroupGreeting[];
  backgroundColor: string;
  textColor: string;
  font: string;
  border: string;
  effect: string;
  confettiType: "standard" | "hearts" | "stars" | "snow";
  envelopeStyle: "classic" | "modern" | "vintage";
  unlockAt: string | null;
  language: string;
}

export function addGreetingToGroupCard(card: GroupCard, greeting: Omit<GroupGreeting, 'createdAt'>): GroupCard {
  return {
    ...card,
    greetings: [
      ...card.greetings,
      { ...greeting, createdAt: new Date().toISOString() }
    ]
  };
}
