import { mount } from '@vue/test-utils';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage, DebugMessageType } from '@/debug/debug-message';


const START_TIME = 0;
const TIME_TO_REFRESH = 5000;
const NEXT_REFRESH = START_TIME + TIME_TO_REFRESH;
beforeAll(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(START_TIME);
});

const DATE_TO_USE = new Date(START_TIME);
const _Date = Date;
// @ts-ignore
global.Date = jest.fn(() => DATE_TO_USE);
// @ts-ignore
global.Date.now = _Date.now;

afterAll(() => {
  jest.useRealTimers();
});

const LOG_CONTENTS = {
  shouldBeLogged: 'shouldBeLogged'
};
const MESSAGE_TYPE = 'received';
const FAKE_MESSAGE = new DebugMessage(MESSAGE_TYPE, LOG_CONTENTS );
const log = new RingBuffer<DebugMessage>(1);
log.add(FAKE_MESSAGE)

// FUTURE: Things I'd like to test but can't
// * That the countdown to next quote decreases when time passes. But Vue doesn't seem to be able to use `useFakeTimers` at all. `new Date()` is faked here, but not inside the component
// * That the window is actually shown, and also that it collapses when the button is clicked when shown. This seems impossible since I can't find a way to wait for the Bootstrap animation to stop

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
    expect(wrapper.get('.collapse').element.classList).not.toContain('show');
  });

  it('is opens when the expand button is clicked', async () => {
    await wrapper.get('.card-header button').trigger('click');

    expect(wrapper.find('.collapsing').exists());
  });

  it('contains the logged message', () => {
    const logEntry = wrapper.get('ul li');

    expect(logEntry.text()).toContain(START_TIME);
    expect(logEntry.text()).toContain(MESSAGE_TYPE);
    expect(logEntry.text().replaceAll(/\s/g, '')).toContain(JSON.stringify(LOG_CONTENTS));
  });

  it('contains at least the time to refresh', () => {
    const timeToRefreshInView = wrapper.text().match(/Next quote in: (\d+)/);
  
    expect(timeToRefreshInView).not.toBeNull();
    expect(+timeToRefreshInView![1]).toEqual(TIME_TO_REFRESH / 1000);
  });

});
