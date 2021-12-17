import { defineStore } from 'pinia';
import { QuoteProvider } from '@/quotes/quote-provider';
import { getProvider, ProviderName } from '@/quotes/get-provider'

interface State {
  favoriteQuotes: Set<string>;
  expertMode: boolean;
  provider: QuoteProvider;
}

function loadProviderFromLocalStorage(): QuoteProvider {
  const storedName = localStorage.getItem('provider');

  if (storedName) {
    return getProvider(ProviderName[storedName as keyof typeof ProviderName])
  } else {
    return getProvider(ProviderName.quotable); // Default
  }
}

function loadStateFromLocalStorage(): State {
  return {
    favoriteQuotes: new Set<string>(JSON.parse(localStorage.getItem('liked') ?? '[]') as string[]),
    expertMode: localStorage.getItem('expertMode') === 'true',
    provider: loadProviderFromLocalStorage(),
  }
}

export const useStore = defineStore('main', {
  state: () => loadStateFromLocalStorage(),

  getters: {
    isFavorite: (state) => (id: string) => state.favoriteQuotes.has(id),
  },

  actions: {
    toggleFavorite(id: string) {
      if (this.isFavorite(id)) {
        this.favoriteQuotes.delete(id);
      } else {
        this.favoriteQuotes.add(id);
      }

      localStorage.setItem('liked', JSON.stringify([...this.favoriteQuotes]));
    },

    toggleExpertMode() {
      this.expertMode = !this.expertMode;

      localStorage.setItem('expertMode', JSON.stringify(this.expertMode));
    },

    setProvider(providerName: ProviderName) {
      this.provider = getProvider(providerName);

      localStorage.setItem('provider', providerName.toString());
    },
  },
});
