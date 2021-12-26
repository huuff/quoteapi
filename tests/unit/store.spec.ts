import { setActivePinia, createPinia } from 'pinia';
import { ProviderType } from '@/quotes/quote-provider';
import { useStore } from '@/store';

beforeEach(() => {
  setActivePinia(createPinia());
});

describe('store', () => {
  it('loads the store from localStorage', () => {
    const PROVIDER = ProviderType.embedded;
    const FAVORITE_QUOTES = [ "test" ];
    const EXPERT_MODE = false;
    
    localStorage.setItem("provider", PROVIDER);
    localStorage.setItem("liked", JSON.stringify(FAVORITE_QUOTES));
    localStorage.setItem('expertMode', JSON.stringify(EXPERT_MODE));

    const store = useStore();

    expect(store.provider.type).toBe(PROVIDER);
    expect(Array.from(store.favoriteQuotes)).toStrictEqual(FAVORITE_QUOTES);
    expect(store.expertMode).toBe(EXPERT_MODE);
  });
});
