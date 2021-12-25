import { Autoplay } from '@/autoplay';
import { createTestingPinia } from '@pinia/testing';
import { QuoteProvider, ProviderType } from '@/quotes/quote-provider';
import { useStore } from '@/store';
import { TEST_QUOTE } from '../test-data';

createTestingPinia();

beforeEach(() => {
  jest.useFakeTimers('modern');
  // @ts-ignore
  jest.spyOn(global, 'setTimeout');
});

const store = useStore();

const mockProvider: QuoteProvider = {
  type: ProviderType.embedded,
  request: jest.fn(() => Promise.resolve(TEST_QUOTE)),
};

store.provider = mockProvider;

const mockUpdateQuote = jest.fn();

describe('Autoplay', () => {
  describe('on creation', () => {
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
    const autoplay = new Autoplay(mockUpdateQuote);

    it('is disabled on first toggle', () => {
      autoplay.toggle();
      expect(autoplay.enabled).toBe(true);
    });

    describe('when toggled on', () => {
      autoplay.toggle();

      it('is enabled', () => {
        expect(autoplay.enabled).toBe(true);
      });
    });
  });
});
