import { mount } from '@vue/test-utils';
import TheExpertModeSwitch from '@/components/TheExpertModeSwitch.vue';
import { createTestingPinia } from '@pinia/testing';
import { useStore } from '@/store';

const wrapper = mount(TheExpertModeSwitch, {
  global: {
    plugins: [ createTestingPinia() ],
  },
});

const store = useStore();

describe('TheExpertModeSwitch', () => {
  it('toggles expert mode in the store when clicked', () => {

    wrapper.find("input[type='checkbox']").trigger('click');

    expect(store.toggleExpertMode).toHaveBeenCalledTimes(1);
  });
});
