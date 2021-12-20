import { Ref } from 'vue';
import { QuoteProvider } from '@/quotes/quote-provider';
import { Quote } from '@/quotes/quote';

// TODO: Finish this

export class Autoplay {
  public enabled: boolean;
  private intervalId: number | undefined;
  
  constructor(
    private readonly provider: Ref<QuoteProvider>,
    private readonly updateQuote: (quote: Quote) => void,
  ) {
    this.enabled = true; 
    provider.value.random().then((quote) => {
      updateQuote(quote);
      this.intervalId = setTimeout(() => updateQuote(provider.value.random()), 7000 + (quote.contents.length * 10));
    });
  }
}
