import { mount } from '@vue/test-utils';
import TheBackground from '@/components/TheBackground.vue';

// Spent a lot of time trying to do this (mostly as a joke)
// only to realize it's not possible until [this](https://github.com/jsdom/jsdom/issues/2166) gets fixed (probably never)
// I'm just disabling it in case someday I can use it.

describe('TheBackground.vue', () => {
  it.skip('should be very dark on a depressing quote', () => {
    const quoteContents = "I FUCKING HATE MY LIFE. EVERY SINGLE DAY OF MY LIFE CONSISTS PURELY OF PAIN, HOPELESSNESS AND SORROW. I CRY MYSELF TO SLEEP EVERY NIGHT HOPING TO NEVER WAKE UP";

    const wrapper = mount(TheBackground, {
      props: {
        currentQuote: {
          id: 'test',
          contents: quoteContents,
          author: 'Me',
          work: 'My life',
        }
      },
    });
  })
});
