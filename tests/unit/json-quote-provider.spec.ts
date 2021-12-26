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
  const provider = new JsonQuoteProvider([ TEST_QUOTE ]);
  
  it('gets the quote from random', async () => {
    expect(await provider.request('random')).toBe(TEST_QUOTE);
  });

  it('gets the quote by author', async () => {
    expect(await provider.request('author', TEST_QUOTE.author)).toBe(TEST_QUOTE);
  });

  it('gets the quote by work', async () => {
    expect(await provider.request('work', TEST_QUOTE.work!)).toBe(TEST_QUOTE);
  });

  it('gets the quote by tag', async () => {
    expect(await provider.request('tag', TEST_QUOTE.tags[0])).toBe(TEST_QUOTE);
  });

  it('gets the quote id', async () => {
    expect(await provider.request('id', TEST_QUOTE.id)).toBe(TEST_QUOTE);
  });

  it('fails when requesting something that does not exist', async () => {
    await expect(provider.request('id', 'doesnotexist')).rejects.toThrow();
  });
});
