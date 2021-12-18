import { Quote } from './quote';
import { QuoteProvider } from './quote-provider';
import { randomElement } from './random-element';
import sampleQuotes from './sample-quotes.json';
import { ProviderName } from '@/quotes/get-provider';

export class JsonQuoteProvider implements QuoteProvider {
  public readonly name: ProviderName = ProviderName.embedded;

  private quotes: Promise<Quote[]>;

  constructor() {
    this.quotes = Promise.resolve(sampleQuotes);
  }

  async random(): Promise<Quote> {
    return this.quotes.then(quotes => randomElement(quotes));
  }

  async byAuthor(author: string): Promise<Quote> {
    return this.quotes.then(quotes => randomElement(quotes.filter(q => q.author === author)));
  }

  async byTag(tag: string): Promise<Quote> {
    return this.quotes.then(quotes => randomElement(quotes.filter(q => q.tags.includes(tag))))
  }

  async byWork(work: string): Promise<Quote> {
    return this.quotes.then(quotes => randomElement(quotes.filter(q => q.work === work)))
  }
}
