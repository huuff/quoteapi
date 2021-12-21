import { Quote } from './quote';
import { QuoteProvider, ProviderType } from './quote-provider';
import { RequestType } from '@/request-type';
import { randomElement } from '@/random-element';
import sampleQuotes from './sample-quotes.json';

export class JsonQuoteProvider implements QuoteProvider {
  public readonly type: ProviderType = ProviderType.embedded;

  private quotes: Promise<Quote[]>;

  constructor() {
    this.quotes = Promise.resolve(sampleQuotes);
  }

  // TODO: Error if not found?
  request(type: 'random'): Promise<Quote>;
  request(type: 'author' | 'tag' | 'work' | 'id', query: string): Promise<Quote>;
  async request(type: any, query?: any): Promise<Quote> {
    if (type === 'random')
      return this.quotes.then(quotes => randomElement(quotes));
    else if (type === 'author') {
      return this.quotes.then(quotes => randomElement(quotes.filter(q => q.author === query)));
    } else if (type === 'work') {
      return this.quotes.then(quotes => randomElement(quotes.filter(q => q.work === query)));
    } else if (type === 'tag') {
      return this.quotes.then(quotes => randomElement(quotes.filter(q => q.tags.includes(query))));
    } else if (type === 'id') {
      return this.quotes.then(quotes => quotes.filter(q => q.id === query)[0]);
    } else {
      throw new Error();
    }
  }

}
