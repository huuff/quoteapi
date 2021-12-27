import { mount } from '@vue/test-utils';
import  TheErrorAlert  from '@/components/TheErrorAlert.vue';

beforeEach(() => {
  jest.useFakeTimers('modern');
});

afterAll(() => {
  jest.useRealTimers();
});



const TEST_ERROR = 'test error';

function createWrapper() {
  const transitionStub = () => ({
    render(h: any): any {
      return (this as any).$options._renderChildren
    }
  })

  return mount(TheErrorAlert, {
    props: { error: TEST_ERROR },
    stubs: { transition: transitionStub() },
  });
}

describe('TheErrorAlert.vue', () => {
  test('the passed error is shown', () => {
    const wrapper = createWrapper();

    expect(wrapper.text()).toContain(TEST_ERROR);
  });

  test('it is not there when no error is passed', () => {
    const wrapper = mount(TheErrorAlert);

    expect(wrapper.find('.alert').exists()).toBe(false);
  });

  test('it becomes visible when an error is passed and disappears with time', async () => {
    const wrapper = mount(TheErrorAlert);

    wrapper.setProps({ error: 'test'});
    await wrapper.vm.$forceUpdate();
    expect(wrapper.isVisible()).toBeTrue();
    jest.advanceTimersByTime(10000); // Enough for it to go away
    await wrapper.vm.$forceUpdate();
    expect(wrapper.isVisible()).toBeFalse();
  });
});
