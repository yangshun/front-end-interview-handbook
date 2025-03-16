import { act, renderHook } from '@testing-library/react';

import useStateWithReset from './use-state-with-reset';
import { useState } from 'react';

describe('useStateWithReset', () => {
  test('return values', () => {
    const { result } = renderHook(() => useStateWithReset());

    expect(result.current[0]).toBe(undefined);
    expect(typeof result.current[1]).toBe('function');
    expect(typeof result.current[2]).toBe('function');
  });

  test('initial state', () => {
    const { result } = renderHook(() => useStateWithReset(0));

    expect(result.current[0]).toBe(0);
  });

  test('set state', () => {
    const { result } = renderHook(() => useStateWithReset(0));

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);
  });

  test('reset', () => {
    const initialState = 0;
    const { result } = renderHook(() => useStateWithReset(initialState));

    act(() => {
      result.current[1](1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe(initialState);
  });
});
