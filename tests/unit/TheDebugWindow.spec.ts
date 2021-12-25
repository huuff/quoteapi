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

  it('contains the logged message', () => {
    const logEntry = wrapper.find('ul li');

    expect(logEntry.text()).toContain(START_TIME);
    expect(logEntry.text()).toContain(MESSAGE_TYPE);
    expect(logEntry.text().replaceAll(/\s/g, '')).toContain(JSON.stringify(LOG_CONTENTS));
  });

  it('contains at least the time to refresh', () => {
    const timeToRefreshInView = wrapper.text().match(/Next quote in: (\d+)/);
    console.log(wrapper.html());
  
    expect(timeToRefreshInView).not.toBeNull();
    expect(+timeToRefreshInView![1]).toEqual(TIME_TO_REFRESH / 1000);
  });

  // TODO: I would love being able to do this, but I had to do some weird stuff to mock
  // Date. Don't jest fake timers work? Do they work only in the test? Investigate it
  //it('one second later, the counter is one less', () => {
    //jest.advanceTimersByTime(1000);
    //const timeToRefreshInView = wrapper.text().match(/Next quote in: (\d+)/);

    //expect(timeToRefreshInView).not.toBeNull();
    //expect(+timeToRefreshInView![1]).toEqual((TIME_TO_REFRESH / 1000) - 1);
  //});
});
