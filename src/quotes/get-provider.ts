import { QuoteProvider } from './quote-provider'
import { JsonQuoteProvider } from './json-quote-provider';
import { QuotableQuoteProvider } from './quotable-quote-provider';

export enum ProviderName {
  'embedded' = 'embedded',
  'quotable' = 'quotable',
}

const providers: { [name in ProviderName]: QuoteProvider } = {
  'embedded': new JsonQuoteProvider(),
  'quotable': new QuotableQuoteProvider(),
};

export function getProvider(name: ProviderName): QuoteProvider {
  return providers[name];
}
