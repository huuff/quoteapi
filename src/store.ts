import { defineStore } from 'pinia';

interface State {
  favoriteQuotes: Set<string>;
  expertMode: boolean;
}

function loadFromLocalStorage(): State {
  return {
    favoriteQuotes: new Set<string>(JSON.parse(localStorage.getItem('liked') ?? '[]') as string[]),
    expertMode: localStorage.getItem('expertMode') === 'true',
  }
}

export const useStore = defineStore('main', {
  state: () => loadFromLocalStorage(),

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
  },
});
