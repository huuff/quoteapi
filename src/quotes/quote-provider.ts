import { Quote } from '@/quotes/quote';

export enum ProviderType {
  'embedded' = 'embedded',
  'quotable' = 'quotable',
}

export interface QuoteProvider {
  type: ProviderType;
  request(type: 'random'): Promise<Quote>;
  request(type: 'author' | 'tag' | 'work' | 'id', query: string): Promise<Quote>;
}

