import { Quote } from './quote';
import { QuoteProvider, ProviderType } from './quote-provider';
import { randomElement } from '@/random-element';
import sampleQuotes from './sample-quotes.json';

export class JsonQuoteProvider implements QuoteProvider {
  public readonly type: ProviderType = ProviderType.embedded;

  private quotes: Promise<Quote[]>;

  constructor() {
    this.quotes = Promise.resolve(sampleQuotes);
  }

  // TODO: Error if not found?
  async byId(id: string): Promise<Quote> {
    return this.quotes.then(quotes => quotes.filter(q => q.id === id)[0]);
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
