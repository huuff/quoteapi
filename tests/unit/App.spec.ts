// Not unit at all
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { createTestingPinia } from '@pinia/testing';
import { QuoteProvider } from '@/quotes/quote-provider';
import { mock } from 'jest-mock-extended';
import { useStore } from '@/store';

const mockProvider = mock<QuoteProvider>();

function createWrapper() {
  return mount(App, {
    global: {
      plugins: [ createTestingPinia() ],
      stubs: [ 'font-awesome-icon' ],
    },
  });
}

describe('App.vue', () => {
  test("it doesn't blow up when mounted", () => {
    const wrapper = createWrapper();
  });

  // TODO: Fix it
  test("requests when provider is changed", () => {
    const wrapper = createWrapper();
    const store = useStore();
    store.provider = mockProvider;

    wrapper.vm.$emit('changeProvider');
    expect(mockProvider.request).toHaveBeenCalledOnce();
  });
});
