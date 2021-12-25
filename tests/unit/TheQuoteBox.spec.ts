import { mount } from '@vue/test-utils';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import { TEST_QUOTE } from '../test-data';

describe('TheQuoteBox.vue', () => {
  const wrapper = mount(TheQuoteBox, {
    props: {
      currentQuote: TEST_QUOTE,
    },
  }); 

  it('contains every field of the quote', () => {
    const componentText = wrapper.text();

    expect(componentText).toContain(TEST_QUOTE.contents);
    expect(componentText).toContain(TEST_QUOTE.author);
    expect(componentText).toContain(TEST_QUOTE.work);
  });

  it('requests a quote by work when the work is clicked', async () => {
    await wrapper.get('.work').trigger('click'); 

    expect(Object.keys(wrapper.emitted())).toContain('requestByWork');
    expect(wrapper.emitted()['requestByWork'][0]).toContain(TEST_QUOTE.work);
  });
});
