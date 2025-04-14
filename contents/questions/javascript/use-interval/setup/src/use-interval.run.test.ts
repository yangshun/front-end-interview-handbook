import { act, renderHook } from '@testing-library/react';
import FakeTimers from '@sinonjs/fake-timers';

import useInterval from './use-interval';
import { useState } from 'react';

let clock: FakeTimers.InstalledClock;

describe('useInterval', () => {
  beforeEach(() => {
    clock = FakeTimers.withGlobal(globalThis).install();
  });

  afterEach(() => {
    clock.uninstall();
  });

  test('return values', () => {
    const { result } = renderHook(() => useInterval(() => {}, 0));

    expect(result.current).toBe(undefined);
  });

  test('calls callback in time', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => clock.tick(1000));

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
