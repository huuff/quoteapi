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
    this.provider.value.random().then(this.resetTimeout.bind(this));
  }

  public resetTimeout(newQuote: Quote): void {
    this.updateQuote(newQuote);
    if (this.enabled) {
      this.timeoutId = setTimeout(
        () => this.provider.value.random().then(this.resetTimeout.bind(this)),
        this.calculateTimeoutDuration(newQuote)
      );
    }
  }

  // So quotes stay longer the longer they are, and time is enough to read them
  private calculateTimeoutDuration(quote: Quote) {
    return MINIMUM_TIMEOUT + (quote.contents.length * 10);
  }
}
