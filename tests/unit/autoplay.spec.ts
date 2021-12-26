import { Autoplay } from '@/autoplay';
import { setActivePinia, createPinia } from 'pinia';
import { QuoteProvider, ProviderType } from '@/quotes/quote-provider';
import { useStore } from '@/store';
import { TEST_QUOTE } from '../test-data';

function createMockProvider(): QuoteProvider {
  setActivePinia(createPinia());
  const store = useStore();
  const mockProvider = {
    type: ProviderType.embedded,
    request: jest.fn(() => Promise.resolve(TEST_QUOTE)),
  };
  store.provider = mockProvider;
  return mockProvider;
};

beforeEach(() => {
  jest.useFakeTimers('modern');
  // @ts-ignore
  jest.spyOn(global, 'setTimeout');
  // @ts-ignore
  jest.spyOn(global, 'clearTimeout');
});

afterAll(() => {
  jest.useRealTimers();
});


describe('Autoplay', () => {
  describe('on creation', () => {
    const mockProvider = createMockProvider();
    const mockUpdateQuote = jest.fn();
    const autoplay = new Autoplay(mockUpdateQuote);

    it('is enabled', () => {
      expect(autoplay.enabled).toBe(true);
    });

    it('requests a quote from provider', () => {
      expect(mockProvider.request).toHaveBeenCalled();
    });

    it('sets the quote', () => {
      expect(mockUpdateQuote).toHaveBeenCalled();
      expect(mockUpdateQuote).toHaveBeenCalledWith(TEST_QUOTE);
    });
  });
  
  describe('when toggling', () => {
    const mockProvider = createMockProvider();
    const mockUpdateQuote = jest.fn();
    const autoplay = new Autoplay(mockUpdateQuote);

    it('is disabled on first toggle', () => {
      autoplay.toggle();
      expect(autoplay.enabled).toBe(true);
    });

    describe('when toggled on', () => {
      (mockProvider.request as jest.MockedFunction<any>).mockClear();
      autoplay.toggle();

      it('is enabled', () => {
        expect(autoplay.enabled).toBe(true);
      });

      it('requests another quote from provider', () => {
        expect(mockProvider.request).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('when timeout is reset', () => {
    const mockProvider = createMockProvider();
    const mockUpdateQuote = jest.fn();
    const autoplay = new Autoplay(mockUpdateQuote);
    (mockProvider.request as jest.MockedFunction<any>).mockClear();
    
    const fakeQuoteLength = 140;
    autoplay.resetTimeout(fakeQuoteLength);

    it('clears a timeout', () => {
      expect(clearTimeout).toHaveBeenCalledTimes(1);
    });

    it('sets a new timeout with at least ten times the length of the quote', () => {
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
    });
  });
});
