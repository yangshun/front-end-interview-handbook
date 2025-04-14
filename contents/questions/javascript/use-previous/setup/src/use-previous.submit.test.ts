import { act, renderHook } from '@testing-library/react';

import usePrevious from './use-previous';
import { useState } from 'react';

describe('usePrevious', () => {
  test('return undefined initially', () => {
    const { result } = renderHook(() => usePrevious(10));

    expect(result.current).toBe(undefined);
  });

  test('return previous value', () => {
    const initialValue = 0;

    const { result } = renderHook(() => {
      const [value, setValue] = useState(initialValue);
      const previous = usePrevious(value);

      return { value, setValue, previous };
    });

    expect(result.current.previous).toBeUndefined();

    act(() => {
      result.current.setValue(10);
    });

    expect(result.current.previous).toBe(initialValue);

    act(() => {
      result.current.setValue(20);
    });

    expect(result.current.previous).toBe(10);
  });

  test('previous value should be stable across re-renders', () => {
    const initialValue = 0;

    const { result, rerender } = renderHook(() => {
      const [value, setValue] = useState(initialValue);
      const previous = usePrevious(value);

      return { value, setValue, previous };
    });

    act(() => {
      result.current.setValue(10);
    });

    expect(result.current.previous).toBe(initialValue);

    rerender();

    // If `usePrevious` is implemented with `useRef` like a clown, this should be the current state.
    expect(result.current.previous).toBe(initialValue);

    act(() => {
      result.current.setValue(20);
    });

    expect(result.current.previous).toBe(10);
  });

  test('previous value should only be updated when the current value changes', () => {
    const initialValue = 10;

    const { result } = renderHook(() => {
      const [value, setValue] = useState(initialValue);
      const previous = usePrevious(value);

      return { value, setValue, previous };
    });

    act(() => {
      result.current.setValue(10);
    });

    expect(result.current.previous).toBeUndefined();

    act(() => {
      result.current.setValue(10);
    });

    expect(result.current.previous).toBeUndefined();

    act(() => {
      result.current.setValue(20);
    });

    expect(result.current.previous).toBe(10);
  });
});
