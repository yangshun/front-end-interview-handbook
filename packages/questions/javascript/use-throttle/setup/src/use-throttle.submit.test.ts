import { act, renderHook } from '@testing-library/react';
import FakeTimers from '@sinonjs/fake-timers';

import useThrottle from './use-throttle';
import { useState } from 'react';

let clock: FakeTimers.InstalledClock;

describe('useThrottle', () => {
  beforeEach(() => {
    clock = FakeTimers.withGlobal(globalThis).install();
  });

  afterEach(() => {
    clock.uninstall();
  });

  test('return values', () => {
    const { result } = renderHook(() => useThrottle(1));

    expect(result.current).toBe(1);
  });

  test('throttle value', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState(1);
      const throttledValue = useThrottle(value, 1000);
      return { value, setValue, throttledValue };
    });

    act(() => result.current.setValue(2));

    expect(result.current.value).toBe(2);
    expect(result.current.throttledValue).toBe(1);

    act(() => clock.tick(1000));

    expect(result.current.throttledValue).toBe(2);
  });

  test('throttle value multiple times', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState(1);
      const throttledValue = useThrottle(value, 1000);
      return { value, setValue, throttledValue };
    });

    act(() => result.current.setValue(2));

    expect(result.current.value).toBe(2);
    expect(result.current.throttledValue).toBe(1);

    act(() => result.current.setValue(3));

    expect(result.current.value).toBe(3);
    expect(result.current.throttledValue).toBe(1);

    act(() => clock.tick(500));

    expect(result.current.throttledValue).toBe(1);

    act(() => clock.tick(500));

    expect(result.current.throttledValue).toBe(3);
  });

  test('clear timeout on unmount', () => {
    const { result, unmount } = renderHook(() => {
      const [value, setValue] = useState(1);
      const throttledValue = useThrottle(value, 1000);
      return { value, setValue, throttledValue };
    });

    act(() => result.current.setValue(2));

    expect(result.current.value).toBe(2);
    expect(result.current.throttledValue).toBe(1);

    unmount();
    act(() => clock.tick(1000));

    expect(result.current.throttledValue).toBe(1);
  });
});
