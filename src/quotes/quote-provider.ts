import { Quote } from '@/quotes/quote';
import { JsonQuoteProvider } from '@/quotes/json-quote-provider';
import { QuotableQuoteProvider } from '@/quotes/quotable-quote-provider';

export enum ProviderType {
  'embedded' = 'embedded',
  'quotable' = 'quotable',
}

export interface QuoteProvider {
  type: ProviderType;
  random(): Promise<Quote>; 
  byAuthor(author: string): Promise<Quote>;
  byTag(tag: string): Promise<Quote>;
  byWork(work: string): Promise<Quote>;
  byId(id: string): Promise<Quote>;
}

const PROVIDER_MAP: { [type in ProviderType]: QuoteProvider } = {
  'embedded': new JsonQuoteProvider(),
  'quotable': new QuotableQuoteProvider(),
};

export function getProvider(type: ProviderType): QuoteProvider {
  return PROVIDER_MAP[type];
}
