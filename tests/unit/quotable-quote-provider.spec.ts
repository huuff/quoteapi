import { QuotableQuoteProvider } from '@/quotes/quotable-quote-provider';
import { Quote } from '@/quotes/quote';
import axios from 'axios';

const FAKE_QUOTABLE_RESPONSE = {
  _id: 'test',
  content: 'test content',
  author: 'test author',
  authorSlug: 'test-author',
  length: 'test content'.length,
  tags: [ 'test-tag' ],
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({ data: FAKE_QUOTABLE_RESPONSE });

const RANDOM_URL = 'https://api.quotable.io/random';

afterEach(() => {
  jest.clearAllMocks();
});

describe('QuotableQuoteProvider', () => {
  const provider = new QuotableQuoteProvider();

  test('random queries the random url', async () => {
    await provider.request('random');

    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith(RANDOM_URL);
  });

  test('author queries the random url with the author param', async () => {
    await provider.request('author', FAKE_QUOTABLE_RESPONSE.author);

    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith(RANDOM_URL, expect.objectContaining({
      params: { author: FAKE_QUOTABLE_RESPONSE.author}
    }));
  });

  test('work throws, since quotable does not have that field', async () => {
    await expect(provider.request('work', 'test')).rejects.toThrowWithMessage(Error, "Method not implemented.");
  });

  test('tag queries the random url with the tag param', async () => {
    await provider.request('tag', FAKE_QUOTABLE_RESPONSE.tags[0]);

    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith(RANDOM_URL, expect.objectContaining({
      params: { tags: FAKE_QUOTABLE_RESPONSE.tags[0]},
    }));
  });

  test('id queries the id url with the id as param', async () => {
    await provider.request('id', FAKE_QUOTABLE_RESPONSE._id);

    expect(axios.get).toHaveBeenCalledOnce();
    expect(axios.get).toHaveBeenCalledWith(`https://api.quotable.io/quotes/${FAKE_QUOTABLE_RESPONSE._id}`);
  });

  test('the quotable data structure gets correctly converted to a Quote', async () => {
    const quote: Quote = await provider.request('random');

    expect(quote.id).toBe(FAKE_QUOTABLE_RESPONSE._id);
    expect(quote.tags).toBe(FAKE_QUOTABLE_RESPONSE.tags);
    expect(quote.author).toBe(FAKE_QUOTABLE_RESPONSE.author);
    expect(quote.contents).toBe(FAKE_QUOTABLE_RESPONSE.content);
  });
});
