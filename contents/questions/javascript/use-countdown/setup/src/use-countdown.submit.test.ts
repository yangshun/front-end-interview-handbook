import { useState } from 'react';
import { act, renderHook } from '@testing-library/react';
import FakeTimers from '@sinonjs/fake-timers';

import useCountdown from './use-countdown';

let clock: FakeTimers.InstalledClock;

describe('useCountdown', () => {
  test('return values', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 0 }));

    expect(typeof result.current).toBe('object');
    expect(typeof result.current.count).toBe('number');
    expect(typeof result.current.start).toBe('function');
    expect(typeof result.current.stop).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  test('initial value', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    expect(result.current.count).toBe(10);
  });

  beforeEach(() => {
    clock = FakeTimers.withGlobal(globalThis).install();
  });

  afterEach(() => {
    clock.uninstall();
  });

  test('counts down', () => {
    const intervalMs = 1000;
    const countStart = 10;

    const { result } = renderHook(() => {
      const countdown = useCountdown({ countStart, intervalMs });
      const [, setState] = useState(false);

      return { ...countdown, flush: () => setState((prev) => !prev) };
    });

    act(() => result.current.start());
    clock.tick(intervalMs / 2);
    act(() => result.current.flush());

    expect(result.current.count).toBe(countStart);

    clock.tick(intervalMs / 2);
    act(() => result.current.flush());

    expect(result.current.count).toBe(countStart - 1);
  });

  test('counts up', () => {
    const intervalMs = 1000;
    const countStart = 0;

    const { result } = renderHook(() => {
      const countdown = useCountdown({
        countStart,
        countStop: 10,
        intervalMs,
        isIncrement: true,
      });

      const [, setState] = useState(false);

      return { ...countdown, flush: () => setState((prev) => !prev) };
    });

    act(() => result.current.start());
    clock.tick(intervalMs / 2);
    act(() => result.current.flush());

    expect(result.current.count).toBe(countStart);

    clock.tick(intervalMs / 2);
    act(() => result.current.flush());

    expect(result.current.count).toBe(countStart + 1);
  });

  test('stop', () => {
    const intervalMs = 1000;
    const countStart = 10;

    const { result } = renderHook(() => {
      const countdown = useCountdown({ countStart, intervalMs });
      const [, setState] = useState(false);

      return { ...countdown, flush: () => setState((prev) => !prev) };
    });

    act(() => result.current.start());
    clock.tick(intervalMs);
    act(() => result.current.stop());

    expect(result.current.count).toBe(countStart - 1);

    clock.tick(intervalMs);
    act(() => result.current.flush());

    expect(result.current.count).toBe(countStart - 1);
  });

  test('reset', () => {
    const intervalMs = 1000;
    const countStart = 10;

    const { result } = renderHook(() => {
      const countdown = useCountdown({ countStart, intervalMs });
      const [, setState] = useState(false);

      return { ...countdown, flush: () => setState((prev) => !prev) };
    });

    act(() => result.current.start());
    clock.tick(intervalMs);
    act(() => result.current.stop());

    expect(result.current.count).toBe(countStart - 1);

    act(() => result.current.reset());

    expect(result.current.count).toBe(countStart);
  });
});
