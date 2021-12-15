import { Quote } from '@/quotes/quote';

export interface QuoteRetriever {
  random(): Promise<Quote>; 
  byAuthor(author: string): Promise<Quote>;
  byTag(tag: string): Promise<Quote>;
  byWork(work: string): Promise<Quote>;
}
