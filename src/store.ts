import { defineStore } from 'pinia';

function loadFromLocalStorage(): Set<string> {
  return new Set<string>(JSON.parse(localStorage.getItem('liked') ?? '[]') as string[]);
}

export const useStore = defineStore('main', {
  state: () => ({
    favoriteQuotes: loadFromLocalStorage(),
  }),

  getters: {
    isFavorite: (state) => (id: string) => state.favoriteQuotes.has(id),
  },

  actions: {
    toggle(id: string) {
      if (this.isFavorite(id)) {
        this.favoriteQuotes.delete(id);
      } else {
        this.favoriteQuotes.add(id);
      }
      localStorage.setItem('liked', JSON.stringify([...this.favoriteQuotes]));
    }
  },
});
