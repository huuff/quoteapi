import { defineStore } from 'pinia';
import { QuoteProvider, ProviderType, getProvider } from '@/quotes/quote-provider';

interface State {
  favoriteQuotes: Set<string>;
  expertMode: boolean;
  provider: QuoteProvider;
}

function loadProviderFromLocalStorage(): QuoteProvider {
  const storedName = localStorage.getItem('provider');

  if (storedName) {
    return getProvider(ProviderType[storedName as keyof typeof ProviderType])
  } else {
    return getProvider(ProviderType.quotable); // Default
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

    setProvider(providerType: ProviderType) {
      this.provider = getProvider(providerType);

      localStorage.setItem('provider', providerType.toString());
    },
  },
});
