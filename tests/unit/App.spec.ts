// Not unit at all
import { mount, VueWrapper, flushPromises } from '@vue/test-utils';
import App from '@/App.vue';
import { createTestingPinia } from '@pinia/testing';
import { QuoteProvider, ProviderType } from '@/quotes/quote-provider';
import { useStore } from '@/store';
import { Store } from 'pinia';
import { TEST_QUOTE } from '../test-data';

const mockProvider: QuoteProvider = {
  type: ProviderType.embedded,
  request: jest.fn(() => Promise.resolve(TEST_QUOTE)),
}

// I wish I knew how to type the store
function createWrapper(): [ VueWrapper<any>, Store<any, any, any, any>] {
  const testingPinia = createTestingPinia();
  const store = useStore();
  store.provider = mockProvider;
  const wrapper = mount(App, {
    global: {
      plugins: [ testingPinia ],
      stubs: [ 'font-awesome-icon' ],
    },
  });

  return [ wrapper, store ];
}

beforeAll(() => {
  jest.useFakeTimers('modern');
});

afterAll(() => {
  jest.useRealTimers();
});

describe('App.vue', () => {
  test("it doesn't blow up when mounted", () => {
    const [ wrapper, _ ] = createWrapper();
  });

  test("when random is clicked, the quote in the box changes", async () => {
    const [ wrapper, store ] = createWrapper();
    (mockProvider as jest.MockedFunction<any>).request.mockClear();
    
    await flushPromises();
    expect(wrapper.text()).toContain(TEST_QUOTE.contents);

    const changedQuote = {...TEST_QUOTE, contents: 'changed contents'};
    store.provider.request = jest.fn(() => Promise.resolve(changedQuote));

    await wrapper.get('#requestRandomButton').trigger('click');
    expect(mockProvider.request).toHaveBeenCalledOnce();
    expect(mockProvider.request).toHaveBeenCalledWith('random');
    await flushPromises();
    expect(wrapper.text()).not.toContain(TEST_QUOTE.contents);
    expect(wrapper.text()).toContain(changedQuote.contents);
  });
});
