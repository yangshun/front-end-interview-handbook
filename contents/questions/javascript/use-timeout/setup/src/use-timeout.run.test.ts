import { act, renderHook } from '@testing-library/react';
import FakeTimers from '@sinonjs/fake-timers';

import useTimeout from './use-timeout';

let clock: FakeTimers.InstalledClock;

describe('useTimeout', () => {
  beforeEach(() => {
    clock = FakeTimers.withGlobal(globalThis).install();
  });

  afterEach(() => {
    clock.uninstall();
  });

  test('return values', () => {
    const { result } = renderHook(() => useTimeout(() => {}, 0));

    expect(result.current).toBe(undefined);
  });

  test('calls callback in time', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => clock.tick(1000));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
