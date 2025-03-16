import { act, renderHook } from '@testing-library/react';
import FakeTimers from '@sinonjs/fake-timers';

import useDebounce from './use-debounce';
import { useState } from 'react';

let clock: FakeTimers.InstalledClock;

describe('useDebounce', () => {
  beforeEach(() => {
    clock = FakeTimers.withGlobal(globalThis).install();
  });

  afterEach(() => {
    clock.uninstall();
  });

  test('return values', () => {
    const { result } = renderHook(() => useDebounce(1, 1));

    expect(result.current).toBe(1);
  });

  test('debounce value', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState(1);
      const debouncedValue = useDebounce(value, 1000);
      return { value, setValue, debouncedValue };
    });

    act(() => result.current.setValue(2));

    expect(result.current.value).toBe(2);
    expect(result.current.debouncedValue).toBe(1);

    act(() => clock.tick(1000));

    expect(result.current.debouncedValue).toBe(2);
  });
});
