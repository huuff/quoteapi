import { mount } from '@vue/test-utils';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage, DebugMessageType } from '@/debug/debug-message';


const START_TIME = 0;
const NEXT_REFRESH = START_TIME + 5000;
beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(new Date(START_TIME));
});

const LOG_CONTENTS = {
  shouldBeLogged: 'shouldBeLogged'
};
const FAKE_MESSAGE = new DebugMessage('received', LOG_CONTENTS );
const log = new RingBuffer<DebugMessage>(1);
log.add(FAKE_MESSAGE)

describe('TheDebugWindow', () => {
  const wrapper = mount(TheDebugWindow, {
    props: {
      nextRefresh: NEXT_REFRESH,
      log,
    },
    global: {
      stubs: [ 'font-awesome-icon' ],
    },
  });  

  it('is initially not shown', () => {
    expect(wrapper.find('.collapse').element.classList).not.toContain('show');
  });

  it('is opens when the expand button is clicked', async () => {
    await wrapper.find('.card-header button').trigger('click');

    expect(wrapper.find('.collapsing').exists());
  });
});
