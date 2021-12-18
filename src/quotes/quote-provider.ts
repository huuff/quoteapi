import { Quote } from '@/quotes/quote';
import { ProviderName } from '@/quotes/get-provider';

export interface QuoteProvider {
  name: ProviderName;
  random(): Promise<Quote>; 
  byAuthor(author: string): Promise<Quote>;
  byTag(tag: string): Promise<Quote>;
  byWork(work: string): Promise<Quote>;
}
