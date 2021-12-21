import { Quote } from './quote';
import { QuoteProvider, ProviderType } from './quote-provider';
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
    id: quote._id,
    contents: quote.content,
    author: quote.author,
    tags: quote.tags,
  };
}

export class QuotableQuoteProvider implements QuoteProvider {
  public readonly type: ProviderType = ProviderType.quotable;
  private readonly RANDOM_URL = 'https://api.quotable.io/random';


  request(type: 'random'): Promise<Quote>;
  request(type: 'author' | 'tag' | 'work' | 'id', query: string): Promise<Quote>;
  async request(type: any, query?: any): Promise<Quote> {
    if (type === 'random')
      return axios.get<QuotableQuote>(this.RANDOM_URL).then(response => fromQuotable(response.data));
    else if (type === 'author') {
      return axios.get<QuotableQuote>(this.RANDOM_URL, { params: { author: query } }).then(response => fromQuotable(response.data));
    } else if (type === 'work') {
      throw new Error('Method not implemented.');
    } else if (type === 'id') {
      return axios.get<QuotableQuote>(`https://api.quotable.io/quotes/${query}`).then(response => fromQuotable(response.data));
    } else if (type === 'tag') {
      return axios.get<QuotableQuote>(this.RANDOM_URL, { params: { tags: query } }).then(response => fromQuotable(response.data));
    } else {
      throw new Error();
    }
  }

}
