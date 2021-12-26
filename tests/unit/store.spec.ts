import { setActivePinia, createPinia } from 'pinia';
import { ProviderType } from '@/quotes/quote-provider';
import { useStore } from '@/store';

beforeEach(() => {
  setActivePinia(createPinia());
  jest.spyOn(window.localStorage.__proto__, 'setItem');
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
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

  describe('expert mode', () => {
    it('is initially false', () => {
      const store = useStore();
      expect(store.expertMode).toBe(false);
    });

    it('when toggled, saves to localStorage', () => {
      const store = useStore();
      store.toggleExpertMode();
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('expertMode', JSON.stringify(store.expertMode));
    });

    it('when toggled, it changes', () => {
      const store = useStore();
      const firstVal = store.expertMode;
      store.toggleExpertMode();
      expect(store.expertMode).not.toBe(firstVal);
    });
  });

  describe('favorite quotes', () => {
    it('is initially empty', () => {
      const store = useStore();
      expect(store.favoriteQuotes.size).toBe(0);
    });

    describe('when a favorite is added', () => {
      const TEST_ID = 'test';

      it('it is in the set', () => {
        const store = useStore();
        store.toggleFavorite(TEST_ID)
        expect(store.favoriteQuotes.has(TEST_ID));
      });

      it('is saved to localStorage', () => {
        const store = useStore();
        store.toggleFavorite(TEST_ID)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('liked', JSON.stringify([ TEST_ID ]));
      });

      it('removed it when toggled again', () => {
        const store = useStore();
        store.toggleFavorite(TEST_ID)
        expect(store.favoriteQuotes.has(TEST_ID));
        store.toggleFavorite(TEST_ID);
        expect(store.favoriteQuotes.has(TEST_ID)).toBe(false);
      });
    });
  });

  it('saves to localStorage when changing the provider', () => {
    const store = useStore();
    store.setProvider(ProviderType.quotable);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'provider', ProviderType.quotable
    );
  });
});
