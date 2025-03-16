import { act, fireEvent, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FakeTimers from '@sinonjs/fake-timers';

import useIdle from './use-idle';

let clock: FakeTimers.InstalledClock;

describe('useIdle', () => {
  beforeEach(() => {
    clock = FakeTimers.withGlobal(globalThis).install();
  });

  afterEach(() => {
    clock.uninstall();
  });

  test('return values', () => {
    const { result } = renderHook(() => useIdle());

    expect(result.current).toBe(false);
  });

  test('idle after timeout', () => {
    const { result } = renderHook(() => useIdle());

    act(() => clock.tick(60_000));

    expect(result.current).toBe(true);
  });

  test('not idle after click', () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useIdle());

    act(() => {
      clock.tick(30_000);
      user.click(document.body);
      clock.tick(30_000);
    });

    expect(result.current).toBe(false);
  });

  test('not idle after key press', () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useIdle());

    act(() => {
      clock.tick(30_000);
      user.keyboard('a');
      clock.tick(30_000);
    });

    expect(result.current).toBe(false);
  });

  test('not idle after hover', () => {
    const user = userEvent.setup();
    const { result } = renderHook(() => useIdle());

    act(() => {
      clock.tick(30_000);
      user.hover(document.body);
      clock.tick(30_000);
    });

    expect(result.current).toBe(false);
  });

  test('not idle after resize', () => {
    const { result } = renderHook(() => useIdle());

    act(() => {
      clock.tick(30_000);
      fireEvent.resize(window);
      clock.tick(30_000);
    });

    expect(result.current).toBe(false);
  });

  test('document visibility change', () => {
    const { result } = renderHook(() => useIdle());

    act(() => {
      Object.defineProperties(document, {
        hidden: { value: true, writable: true },
        visibilityState: { value: 'hidden', writable: true },
      });

      fireEvent(document, new Event('visibilitychange'));
      clock.tick(60_000);
    });

    expect(result.current).toBe(true);

    act(() => {
      Object.defineProperties(document, {
        hidden: { value: false, writable: true },
        visibilityState: { value: 'visible', writable: true },
      });

      fireEvent(document, new Event('visibilitychange'));
    });

    expect(result.current).toBe(false);
  });

  test('remove event listeners on unmount', () => {
    const { result, unmount } = renderHook(() => useIdle());

    expect(result.current).toBe(false);

    unmount();
    act(() => clock.tick(60_000));

    expect(result.current).toBe(false);
  });
});
