import { act, renderHook } from '@testing-library/react';
import FakeTimers from '@sinonjs/fake-timers';

import useInterval from './use-interval';

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

  test('calls callback multiple times', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();
    const times = 5;
    act(() => clock.tick(1000 * times));

    expect(callback).toHaveBeenCalledTimes(times);
  });

  describe('delay', () => {
    test('delay changes', () => {
      const callback = jest.fn();
      const { rerender } = renderHook(
        ({ delay }) => useInterval(callback, delay),
        {
          initialProps: { delay: 1000 },
        },
      );

      clock.tick(1000);

      expect(callback).toHaveBeenCalledTimes(1);

      rerender({ delay: 200 });
      clock.tick(1000);

      expect(callback).toHaveBeenCalledTimes(6);
    });

    test('changed to null', () => {
      const callback = jest.fn();
      const { rerender } = renderHook<void, { delay: number | null }>(
        ({ delay }) => useInterval(callback, delay),
        {
          initialProps: { delay: 1000 },
        },
      );

      expect(callback).not.toHaveBeenCalled();

      rerender({ delay: null });
      clock.tick(1000);

      expect(callback).not.toHaveBeenCalled();
    });

    test('starts with null', () => {
      const callback = jest.fn();
      const { rerender } = renderHook<void, { delay: number | null }>(
        ({ delay }) => useInterval(callback, delay),
        {
          initialProps: { delay: null },
        },
      );

      expect(callback).not.toHaveBeenCalled();

      rerender({ delay: 500 });
      clock.tick(1000);

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  test('clears interval on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useInterval(callback, 1000));

    unmount();
    act(() => clock.tick(1000));

    expect(callback).not.toHaveBeenCalled();
  });
});
