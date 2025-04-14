import { act, renderHook } from '@testing-library/react';

import useMediatedState from './use-mediated-state';
import { useState } from 'react';

describe('useMediatedState', () => {
  test('return values', () => {
    const { result } = renderHook(() => useMediatedState(() => {}));

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBe(2);
    expect(typeof result.current[0]).toBe('undefined');
    expect(typeof result.current[1]).toBe('function');
  });

  test('initial state', () => {
    const initialState = 42;
    const { result } = renderHook(() =>
      useMediatedState(() => initialState, initialState),
    );

    expect(result.current[0]).toBe(initialState);
  });

  test('mediator', () => {
    const { result } = renderHook(() => useMediatedState((x) => x * 2, 1));

    act(() => result.current[1](2));

    expect(result.current[0]).toBe(4);
  });

  test('mediator with dispatch', () => {
    const { result } = renderHook(() =>
      // @ts-expect-error
      useMediatedState((x, dispatch) => dispatch(x * 2), 1),
    );

    act(() => result.current[1](2));

    expect(result.current[0]).toBe(4);
  });

  test('works with updater function', () => {
    const { result } = renderHook(() => useMediatedState((x) => x * 2, 1));

    act(() => result.current[1]((x) => x + 1));

    expect(result.current[0]).toBe(4);
  });

  test('works with updater function and dispatch', () => {
    const { result } = renderHook(() =>
      // @ts-expect-error
      useMediatedState((x, dispatch) => dispatch(x * 2), 1),
    );

    act(() => result.current[1]((x) => x + 1));

    expect(result.current[0]).toBe(4);
  });
});
