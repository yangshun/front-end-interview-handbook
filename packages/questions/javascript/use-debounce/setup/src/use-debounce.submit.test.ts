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

  test('debounce value multiple times', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState(1);
      const debouncedValue = useDebounce(value, 1000);
      return { value, setValue, debouncedValue };
    });

    act(() => result.current.setValue(2));

    expect(result.current.value).toBe(2);
    expect(result.current.debouncedValue).toBe(1);

    act(() => clock.tick(500));

    expect(result.current.debouncedValue).toBe(1);

    act(() => result.current.setValue(3));

    expect(result.current.value).toBe(3);
    expect(result.current.debouncedValue).toBe(1);

    act(() => clock.tick(500));

    expect(result.current.debouncedValue).toBe(1);

    act(() => clock.tick(500));

    expect(result.current.debouncedValue).toBe(3);
  });

  test('clear timeout on unmount', () => {
    const { result, unmount } = renderHook(() => {
      const [value, setValue] = useState(1);
      const debouncedValue = useDebounce(value, 1000);
      return { value, setValue, debouncedValue };
    });

    act(() => result.current.setValue(2));

    expect(result.current.value).toBe(2);
    expect(result.current.debouncedValue).toBe(1);

    unmount();
    act(() => clock.tick(1000));

    expect(result.current.debouncedValue).toBe(1);
  });
});
