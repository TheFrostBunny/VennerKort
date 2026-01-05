import { CardType } from "@/components/CardCustomizer";

export const STORAGE_BUCKET_PROFILE_IMAGES = 'profile-images';

export const DEFAULT_MESSAGES: Record<CardType, string[]> = {
  friend: [
    "Bestevenn! Håper dagen din er like fantastisk som deg!",
    "Du er en fantastisk person som sprer glede hver dag!",
    "Sender deg en stor klem og masse gode tanker!",
    "Takk for at du alltid er der for meg!",
    "Du gjør verden til et bedre sted bare ved å være deg selv."
  ],
  love: [
    "Du er min kjærlighet, alltid og for alltid!",
    "Hjertet mitt slår for deg!",
    "Du er solen i mitt liv!",
    "Jeg elsker deg mer enn ord kan beskrive.",
    "Hver dag med deg er et eventyr."
  ],
  crush: [
    "Jeg har et hemmelig crush på deg!",
    "Du er utrolig spesiell!",
    "Håper vi kan bli bedre kjent!",
    "Du får meg til å smile uten å prøve.",
    "Tenker på deg mer enn jeg tør å si."
  ]
};
