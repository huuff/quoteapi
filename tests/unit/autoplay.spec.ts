import { Autoplay } from '@/autoplay';
import { createTestingPinia } from '@pinia/testing';
import { QuoteProvider, ProviderType } from '@/quotes/quote-provider';
import { useStore } from '@/store';
import { TEST_QUOTE } from '../test-data';

createTestingPinia();

const store = useStore();

const mockProvider: QuoteProvider = {
  type: ProviderType.embedded,
  request: jest.fn(() => Promise.resolve(TEST_QUOTE)),
};

store.provider = mockProvider;

const mockUpdateQuote = jest.fn();

describe('Autoplay', () => {
  const autoplay = new Autoplay(mockUpdateQuote);
  
  it('requests a quote on creation', () => {
    expect(mockProvider.request).toHaveBeenCalledTimes(1);
  });

  it('updates the quote with that one', () => {
    expect(mockUpdateQuote).toHaveBeenCalledTimes(1);
    expect(mockUpdateQuote).toHaveBeenCalledWith(TEST_QUOTE);
  });

  describe('when toggled', () => {
    it('if enabled, gets disabled', async () => {
      expect(autoplay.enabled).toBe(true);
      autoplay.toggle();

      expect(autoplay.enabled).toBe(false);
    });

    it('if disabled, gets enabled', () => {
      autoplay.toggle();

      expect(autoplay.enabled).toBe(true);
    });
  });

  // TODO: Test the reset, preferably including time logic (useFakeTimers)
  describe('when reset', () => {
    jest.clearAllMocks();
  });
});
