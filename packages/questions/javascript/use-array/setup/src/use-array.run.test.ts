import { act, renderHook } from '@testing-library/react';

import useArray from './use-array';

describe('useArray', () => {
  test('return types', () => {
    const { result } = renderHook(() => useArray([]));

    expect(result.current.array).toBeInstanceOf(Array);
    expect(typeof result.current.set).toBe('function');
    expect(typeof result.current.push).toBe('function');
    expect(typeof result.current.filter).toBe('function');
    expect(typeof result.current.update).toBe('function');
    expect(typeof result.current.remove).toBe('function');
    expect(typeof result.current.clear).toBe('function');
  });

  test('initial state', () => {
    const initialValue = [1, 2, 3];

    const { result } = renderHook(() => useArray(initialValue));

    expect(result.current.array).toEqual(initialValue);
  });

  test('push element', () => {
    const initialValue = [1, 2, 3];

    const { result } = renderHook(() => useArray(initialValue));

    act(() => {
      result.current.push(4);
    });

    expect(result.current.array).toEqual(initialValue.concat(4));
  });

  test('filter elements', () => {
    const { result } = renderHook(() => useArray([1, 2, 3, 4]));

    act(() => {
      result.current.filter((n) => n % 2 === 0);
    });

    expect(result.current.array).toEqual([2, 4]);
  });

  test('update element', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.update(1, 4);
    });

    expect(result.current.array).toEqual([1, 4, 3]);
  });

  test('remove element', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.array).toEqual([1, 3]);
  });

  test('clear array', () => {
    const { result } = renderHook(() => useArray([1, 2, 3]));

    act(() => {
      result.current.clear();
    });

    expect(result.current.array).toEqual([]);
  });
});
