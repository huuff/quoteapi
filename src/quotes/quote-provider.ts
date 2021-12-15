import { Quote } from '@/quotes/quote';

export interface QuoteProvider {
  random(): Promise<Quote>; 
  byAuthor(author: string): Promise<Quote>;
  byTag(tag: string): Promise<Quote>;
  byWork(work: string): Promise<Quote>;
}
