import { act, renderHook } from '@testing-library/react';

import useCounter from './use-counter-ii';

describe('useCounter', () => {
  test('return values', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(typeof result.current.increment).toBe('function');
    expect(typeof result.current.decrement).toBe('function');
    expect(typeof result.current.reset).toBe('function');
    expect(typeof result.current.setCount).toBe('function');
  });

  test('initial value', () => {
    const { result } = renderHook(() => useCounter(3));

    expect(result.current.count).toBe(3);
  });

  test('increment', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  test('decrement', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(-1);
  });

  test('reset', () => {
    const { result } = renderHook(() => useCounter(3));

    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.reset();
    });
    expect(result.current.count).toBe(3);
  });

  describe('setCount', () => {
    test('direct', () => {
      const { result } = renderHook(() => useCounter());

      act(() => {
        result.current.setCount(5);
      });
      expect(result.current.count).toBe(5);
    });

    test('can increment from current value', () => {
      const { result } = renderHook(() => useCounter(5));

      act(() => {
        result.current.setCount((x) => x + 2);
      });
      expect(result.current.count).toBe(7);
    });
  });

  test('integration', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.setCount((x) => x + 2);
    });
    expect(result.current.count).toBe(7);

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(8);

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(7);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });

  test('memoize functions', () => {
    const { result, rerender } = renderHook(() => useCounter());

    const increment = result.current.increment;
    const decrement = result.current.decrement;
    const reset = result.current.reset;
    const setCount = result.current.setCount;

    rerender();

    expect(result.current.increment).toBe(increment);
    expect(result.current.decrement).toBe(decrement);
    expect(result.current.reset).toBe(reset);
    expect(result.current.setCount).toBe(setCount);
  });
});
