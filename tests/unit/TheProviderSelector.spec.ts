import { mount } from '@vue/test-utils';
import TheProviderSelector from '@/components/TheProviderSelector.vue';
import { createTestingPinia } from '@pinia/testing';
import { useStore } from '@/store';
import {ProviderType} from '@/quotes/quote-provider';


const wrapper = mount(TheProviderSelector, {
  global: {
    plugins: [ createTestingPinia() ],
  },
});

const store = useStore();

describe('TheProviderSelector.vue', () => {
  it('sets provider in store on change', () => {
    wrapper.find('select').setValue(ProviderType.embedded); 

    expect(store.setProvider).toHaveBeenCalledTimes(1);
  });

  it('emits on provider change', () => {
    wrapper.find('select').setValue(ProviderType.quotable);

    expect(Object.keys(wrapper.emitted())).toContain('changeProvider');
  });
});
