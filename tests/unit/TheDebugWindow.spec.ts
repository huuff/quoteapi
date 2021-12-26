import { mount } from '@vue/test-utils';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage, } from '@/debug/debug-message';

const TEST_MESSAGE_TYPE = 'received';
const TEST_MESSAGE_CONTENTS = {
  logContents: 'logContents'
};
const TEST_MESSAGE: DebugMessage = new DebugMessage(TEST_MESSAGE_TYPE, TEST_MESSAGE_CONTENTS);
const TEST_TIME_TO_REFRESH = 5000;

const TEST_START_TIME = 0;

beforeEach(() => {
  jest.useFakeTimers('modern');
  jest.setSystemTime(TEST_START_TIME);
});

afterAll(() => {
  jest.useRealTimers();
});

function createTestDebugWindow() {
  const log = new RingBuffer<DebugMessage>(1);
  log.add(TEST_MESSAGE);
  return mount(TheDebugWindow, {
    props: {
      log, nextRefresh: TEST_START_TIME + TEST_TIME_TO_REFRESH
    },
    global: {
      stubs: [ 'font-awesome-icon' ],
    },
  });
}

describe('TheDebugWindow.vue', () => {
  test('it is initially not shown', () => {
    const wrapper = createTestDebugWindow();

    expect(wrapper.get('.collapse').element.classList).not.toContain('show');
  });

  // FUTURE: Would love to test that it's shown when it finishes
  // the animation, and that it can be closed thereafter,
  // but test-utils offer no easy way for this yet
  test('it is collapsing when expanded', async () => {
    const wrapper = createTestDebugWindow();

    await wrapper.get('#toggleDebugWindow').trigger('click');

    expect(wrapper.find('.collapsing').exists()).toBeTrue();
  });

  test('contains the logged message', () => {
    const wrapper = createTestDebugWindow(); 
    const logEntry = wrapper.get('ul li');

    expect(logEntry.text()).toContain(TEST_START_TIME);
    expect(logEntry.text()).toContain(TEST_MESSAGE_TYPE);
    expect(logEntry.text().replaceAll(/\s/g, '')).toContain(JSON.stringify(TEST_MESSAGE_CONTENTS));
  });

  test('contains at least the time to refresh', () => {
    const wrapper = createTestDebugWindow();
    const timeToRefreshInView = wrapper.text().match(/Next quote in: (\d+)/);
  
    expect(timeToRefreshInView).not.toBeNull();
    expect(+timeToRefreshInView![1]).toEqual(TEST_TIME_TO_REFRESH / 1000);

  });

});
