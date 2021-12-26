import { JsonQuoteProvider } from '@/quotes/json-quote-provider';
import { Quote } from '@/quotes/quote';

const TEST_QUOTE: Quote = {
  id: 'testid',
  contents: 'testcontents',
  work: 'testwork',
  author: 'testauthor',
  tags: [ 'testtag' ],
}

describe('JsonQuoteProvider', () => {
  //const provider = new JsonQuoteProvider([ TEST_QUOTE ]);
  const provider = new JsonQuoteProvider();
  
  it('gets the quote from random', () => {
    expect(provider.request('random')).toBe(TEST_QUOTE);
  });

  it('gets the quote by author', () => {
    expect(provider.request('author', TEST_QUOTE.author)).toBe(TEST_QUOTE);
  });

  it('gets the quote by work', () => {
    expect(provider.request('work', TEST_QUOTE.work!)).toBe(TEST_QUOTE);
  });

  it('gets the quote by tag', () => {
    expect(provider.request('tag', TEST_QUOTE.tags[0])).toBe(TEST_QUOTE);
  });

  it('gets the quote id', () => {
    expect(provider.request('id', TEST_QUOTE.id)).toBe(TEST_QUOTE);
  });

  it('fails when requesting something that does not exist', () => {
    expect(provider.request('id', 'doesnotexist')).toThrow();
  });
});
