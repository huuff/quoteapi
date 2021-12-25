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

  it('like button is "regular" (empty) when not a favorite quote', () => {
    expect(wrapper.get('#like').attributes()['data-prefix']).toBe('far');
  });

  it('like button is "solid" (filled) when it\'s a favorite quote', async () => {
    store.favoriteQuotes = new Set<string>([TEST_QUOTE.id]);
    await wrapper.vm.$forceUpdate();
    expect(wrapper.get('#like').attributes()['data-prefix']).toBe('fas');
  });

  it('clicking the like toggles the favorite status', async () => {
    await wrapper.get('#like').trigger('click');

    expect(store.toggleFavorite).toHaveBeenCalledWith(TEST_QUOTE.id);
  });

  describe('requests', () => {
    it('random triggers a requestRandom event', async () => {
      await wrapper.get('#requestRandomButton').trigger('click');

      expect(wrapper.emitted()['requestRandom']).toBeDefined();
    }); 
    
    it('author request triggers a requestQuery with the author', async () => {
      await wrapper.get('#requestAuthorButton').trigger('click');

      expect(wrapper.emitted()['requestQuery']).toBeDefined();
      expect((wrapper.emitted()['requestQuery'][0] as string[])[0]).toBe('author');
      expect((wrapper.emitted()['requestQuery'][0] as string[])[1]).toBe(TEST_QUOTE.author);
    });

    it('tag request triggers a requestQuery with the tag', async () => {
      await wrapper.get('#tags a:first-child').trigger('click');

      expect(wrapper.emitted()['requestQuery']).toBeDefined();
      expect((wrapper.emitted()['requestQuery'][1] as string[])[0]).toBe('tag');
      expect((wrapper.emitted()['requestQuery'][1] as string[])[1]).toBe(TEST_QUOTE.tags[0]);
    });

    it('favorite request triggers a requestFavorite', async () => {
      await wrapper.get('#requestFavorite').trigger('click');

      expect(wrapper.emitted()['requestFavorite']).toBeDefined();
    });
  });

  describe('autoplay', () => {
    it('when true, the icon is a pause', () => {
      expect(wrapper.get('#autoplayIcon').attributes()['data-icon']).toBe('pause');
    }); 

    it('when clicked triggers a toggle autoplay event', async () => {
      await wrapper.get('#autoplayButton').trigger('click');

      expect(wrapper.emitted()['toggleAutoplay']).toBeDefined();
    })

    it('is a play icon when false', async () => {
      await wrapper.setProps({ autoplay: false });

      expect(wrapper.get('#autoplayIcon').attributes()['data-icon']).toBe('play');
    });
  });
});
