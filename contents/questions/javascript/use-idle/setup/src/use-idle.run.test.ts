import { act, renderHook } from '@testing-library/react';
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
});
