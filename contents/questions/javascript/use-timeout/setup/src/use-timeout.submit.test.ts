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

  test('clears timeout on unmount', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useTimeout(callback, 1000));

    unmount();
    act(() => clock.tick(1000));

    expect(callback).not.toHaveBeenCalled();
  });

  test('calls timeout only once', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => clock.tick(1000 * 5));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  describe('callback changes', () => {
    test('before the first execution', () => {
      const callback = jest.fn();
      const { rerender } = renderHook<void, { callback: () => void }>(
        ({ callback }) => useTimeout(callback, 1000),
        {
          initialProps: { callback },
        },
      );

      expect(callback).not.toHaveBeenCalled();

      clock.tick(500);

      const callbackNew = jest.fn();
      rerender({ callback: callbackNew });

      expect(callback).not.toHaveBeenCalled();
      expect(callbackNew).not.toHaveBeenCalled();

      clock.tick(500);
      expect(callback).not.toHaveBeenCalled();
      expect(callbackNew).toHaveBeenCalledTimes(1);
    });

    test('after the first execution', () => {
      const callback = jest.fn();
      const { rerender } = renderHook<void, { callback: () => void }>(
        ({ callback }) => useTimeout(callback, 1000),
        {
          initialProps: { callback },
        },
      );

      expect(callback).not.toHaveBeenCalled();

      clock.tick(1000);
      expect(callback).toHaveBeenCalledTimes(1);

      const callbackNew = jest.fn();
      rerender({ callback: callbackNew });

      expect(callbackNew).not.toHaveBeenCalled();
      clock.tick(1000);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callbackNew).toHaveBeenCalledTimes(0);
    });
  });

  describe('delay', () => {
    describe('delay changes', () => {
      test('before the first execution', () => {
        const callback = jest.fn();
        const { rerender } = renderHook<void, { delay: number | null }>(
          ({ delay }) => useTimeout(callback, delay),
          {
            initialProps: { delay: 1000 },
          },
        );

        expect(callback).not.toHaveBeenCalled();

        rerender({ delay: 2000 });
        clock.tick(1500);

        expect(callback).not.toHaveBeenCalled();
        clock.tick(1000);

        expect(callback).toHaveBeenCalledTimes(1);
      });

      test('after the first execution', () => {
        const callback = jest.fn();
        const { rerender } = renderHook<void, { delay: number | null }>(
          ({ delay }) => useTimeout(callback, delay),
          {
            initialProps: { delay: 1000 },
          },
        );

        expect(callback).not.toHaveBeenCalled();
        clock.tick(1000);

        expect(callback).toHaveBeenCalledTimes(1);

        rerender({ delay: 2000 });
        clock.tick(1500);

        expect(callback).toHaveBeenCalledTimes(1);
        clock.tick(1000);

        expect(callback).toHaveBeenCalledTimes(2);
      });
    });

    test('changed to null', () => {
      const callback = jest.fn();
      const { rerender } = renderHook<void, { delay: number | null }>(
        ({ delay }) => useTimeout(callback, delay),
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
        ({ delay }) => useTimeout(callback, delay),
        {
          initialProps: { delay: null },
        },
      );

      expect(callback).not.toHaveBeenCalled();

      rerender({ delay: 1000 });
      clock.tick(1000);

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
