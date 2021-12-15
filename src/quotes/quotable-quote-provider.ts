import { Quote } from './quote';
import { QuoteProvider } from './quote-provider';
import axios from 'axios';

interface QuotableQuote {
  _id: string;
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  tags: string[];
}

function fromQuotable(quote: QuotableQuote): Quote {
  return {
    contents: quote.content,
    author: quote.author,
    tags: quote.tags,
  };
}

export class QuotableQuoteProvider implements QuoteProvider {
  private readonly URL = 'https://api.quotable.io/random';

  async random(): Promise<Quote> {
    return axios.get<QuotableQuote>(this.URL).then(response => fromQuotable(response.data));
  }

  async byAuthor(author: string): Promise<Quote> {
    throw new Error('Method not implemented.');
  }

  async byTag(tag: string): Promise<Quote> {
    throw new Error('Method not implemented.');
  }

  async byWork(work: string): Promise<Quote> {
    throw new Error('Method not implemented.');
  }

}
