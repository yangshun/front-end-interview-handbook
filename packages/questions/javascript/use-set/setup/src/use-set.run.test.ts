import { act, renderHook } from '@testing-library/react';

import useSet from './use-set';

describe('useSet', () => {
  test('return values', () => {
    const { result } = renderHook(() => useSet());

    expect(result.current.set).toBeInstanceOf(Set);
    expect(typeof result.current.add).toBe('function');
    expect(typeof result.current.remove).toBe('function');
    expect(typeof result.current.toggle).toBe('function');
    expect(typeof result.current.reset).toBe('function');
    expect(typeof result.current.clear).toBe('function');
  });

  test('initial value', () => {
    const initialValue = new Set([1, 2, 3]);

    const { result } = renderHook(() => useSet(initialValue));

    expect(result.current.set).toEqual(initialValue);
  });

  test('add element', () => {
    const { result } = renderHook(() => useSet());

    act(() => {
      result.current.add(1);
    });

    expect(result.current.set).toEqual(new Set([1]));
  });

  test('remove element', () => {
    const { result } = renderHook(() => useSet(new Set([1, 2, 3])));

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.set).toEqual(new Set([2, 3]));
  });

  test('toggle element', () => {
    const { result } = renderHook(() => useSet(new Set([1, 2, 3])));

    act(() => {
      result.current.toggle(1);
    });

    expect(result.current.set).toEqual(new Set([2, 3]));

    act(() => {
      result.current.toggle(1);
    });

    expect(result.current.set).toEqual(new Set([2, 3, 1]));
  });

  test('reset elements', () => {
    const { result } = renderHook(() => useSet(new Set([1, 2, 3])));

    act(() => {
      result.current.add(4);
    });

    expect(result.current.set).toEqual(new Set([1, 2, 3, 4]));

    act(() => {
      result.current.reset();
    });

    expect(result.current.set).toEqual(new Set([1, 2, 3]));
  });

  test('clear elements', () => {
    const { result } = renderHook(() => useSet(new Set([1, 2, 3])));

    act(() => {
      result.current.clear();
    });

    expect(result.current.set).toEqual(new Set());
  });
});
