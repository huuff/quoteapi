import { Quote } from './quote';
import { QuoteRetriever } from './quote-retriever';
import { randomElement } from './random-element';
import sampleQuotes from './sample-quotes.json';

export class JsonQuoteRetriever implements QuoteRetriever {
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
