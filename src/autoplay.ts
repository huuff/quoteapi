import { Quote } from '@/quotes/quote';
import { useStore } from '@/store';

export class Autoplay {
  private readonly store = useStore();

  public enabled: boolean;
  public nextRefresh: number = new Date().getTime();
  private timeoutId: number | undefined;
  
  constructor(
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
    this.store.provider.request('random').then((quote) => {
      this.updateQuote(quote);
      this.resetTimeout(quote.contents.length);
    });
  }

  public resetTimeout(quoteLength: number): void {
    clearTimeout(this.timeoutId);
    if (this.enabled) {
      this.timeoutId = setTimeout(() => this.store.provider.request('random').then((newQuote: Quote) => {
        this.updateQuote(newQuote);
        this.resetTimeout(newQuote.contents.length);
      }),
        this.calculateTimeoutDuration(quoteLength)
      );
    }
  }

  // So quotes stay longer the longer they are, and time is enough to read them
  private calculateTimeoutDuration(quoteLength: number) {
    const duration = 7000 + (quoteLength * 10);
    this.nextRefresh = new Date().getTime() + duration;
    return duration;
  }
}
