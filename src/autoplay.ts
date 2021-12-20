import { Ref } from 'vue';
import { QuoteProvider } from '@/quotes/quote-provider';
import { Quote } from '@/quotes/quote';

const MINIMUM_TIMEOUT = 7000;

export class Autoplay {
  public enabled: boolean;
  private timeoutId: number | undefined;
  
  constructor(
    private readonly provider: Ref<QuoteProvider>,
    private readonly updateQuote: (quote: Quote) => void,
  ) {
    this.enabled = true; 
    this.start();
  }

  public toggle(): void {
    if (this.enabled) {
      this.stop();
    } else {
      this.start(); 
    }

    this.enabled = !this.enabled;
  }

  public stop(): void {
    clearTimeout(this.timeoutId);
  }

  public start(): void {
    this.provider.value.random().then((quote) => {
      this.updateQuote(quote);
      this.resetTimeout(quote.contents.length);
    });
  }

  public resetTimeout(quoteLength: number): void {
    if (this.enabled) {
      this.timeoutId = setTimeout(() => this.provider.value.random().then((newQuote) => {
        this.updateQuote(newQuote);
        this.resetTimeout(newQuote.contents.length);
      }),
        this.calculateTimeoutDuration(quoteLength)
      );
    }
  }

  // So quotes stay longer the longer they are, and time is enough to read them
  private calculateTimeoutDuration(quoteLength: number) {
    return MINIMUM_TIMEOUT + (quoteLength * 10);
  }
}
