import { JsonQuoteProvider } from '@/quotes/json-quote-provider';
import { QuotableQuoteProvider } from '@/quotes/quotable-quote-provider';
import { QuoteProvider, ProviderType } from '@/quotes/quote-provider';

const PROVIDER_MAP: { [type in ProviderType]: QuoteProvider } = {
  'embedded': new JsonQuoteProvider(),
  'quotable': new QuotableQuoteProvider(),
};

export function getProvider(type: ProviderType): QuoteProvider {
  return PROVIDER_MAP[type];
}
