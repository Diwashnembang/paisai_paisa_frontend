import { create } from 'zustand';
import translations from '../language.json';

type Language = 'en' | 'np';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  t: (path) => {
    const keys = path.split('.');
    let value = translations[get().language];
    for (const key of keys) {
      value = (value as Record<string, any>)?.[key];
    }
    return typeof value === 'string' ? value : path;
  },
}));
