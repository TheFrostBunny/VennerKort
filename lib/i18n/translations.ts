import nb from './locales/nb.json';
import en from './locales/en.json';

export const translations = {
  nb,
  en
} as const;

export type Language = 'nb' | 'en';
export type TranslationKey = keyof typeof translations.nb;
