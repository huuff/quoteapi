import { Quote } from '@/quotes/quote';
import { JsonQuoteProvider } from '@/quotes/json-quote-provider';
import { QuotableQuoteProvider } from '@/quotes/quotable-quote-provider';

export enum ProviderType {
  'embedded' = 'embedded',
  'quotable' = 'quotable',
}

export interface QuoteProvider {
  type: ProviderType;
  request(type: 'random'): Promise<Quote>;
  request(type: 'author' | 'tag' | 'work' | 'id', query: string): Promise<Quote>;
}

const PROVIDER_MAP: { [type in ProviderType]: QuoteProvider } = {
  'embedded': new JsonQuoteProvider(),
  'quotable': new QuotableQuoteProvider(),
};

export function getProvider(type: ProviderType): QuoteProvider {
  return PROVIDER_MAP[type];
}
