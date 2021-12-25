import { mount } from '@vue/test-utils';
import TheQuoteActions from '@/components/TheQuoteActions.vue';
import { TEST_QUOTE } from '../test-data';
import { createTestingPinia } from '@pinia/testing';
import { useStore } from '@/store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faHeart as fasHeart, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

library.add(fasHeart);
library.add(farHeart);
library.add(faPause);
library.add(faPlay);

const wrapper = mount(TheQuoteActions, {
  props: {
    currentQuote: TEST_QUOTE,
    autoplay: true,
  },
  global: {
    components: {
      'font-awesome-icon': FontAwesomeIcon,
    },
    plugins: [ createTestingPinia() ],
  },
});

const store = useStore();

describe('TheQuoteActions.vue', () => {

  it('contains all tags', () => {
    for (const tag of TEST_QUOTE.tags) {
      expect(wrapper.text()).toContain(tag);
    }
  });
});
