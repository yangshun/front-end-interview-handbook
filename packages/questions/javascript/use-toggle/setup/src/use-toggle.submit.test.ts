import { act, renderHook } from '@testing-library/react';

import useToggle from './use-toggle';

describe('useToggle', () => {
  test('return values', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
  });

  test('initial value', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  test('toggle', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });

  test('setValue with value', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[2](true);
    });

    expect(result.current[0]).toBe(true);
  });

  test('setValue with false', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[2](false);
    });

    expect(result.current[0]).toBe(false);
  });

  test('setValue with function', () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[2]((x) => !x);
    });

    expect(result.current[0]).toBe(true);
  });
});
