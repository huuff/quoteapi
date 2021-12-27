// Not unit at all
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { createTestingPinia } from '@pinia/testing';
import { useStore } from '@/store';

function createWrapper() {
  return mount(App, {
    global: {
      plugins: [ createTestingPinia() ],
    },
    stubs: [ 'font-awesome-icon' ],
  });
}


describe('App.vue', () => {
  test("it doesn't blow up when mounted", () => {
    const wrapper = createWrapper();
  });
});
