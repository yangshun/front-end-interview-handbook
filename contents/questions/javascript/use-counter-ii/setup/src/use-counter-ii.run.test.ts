import { act, renderHook } from '@testing-library/react';
import useCounter from './use-counter-ii';

describe('useCounter', () => {
  test('return values', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(typeof result.current.increment).toBe('function');
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
});
