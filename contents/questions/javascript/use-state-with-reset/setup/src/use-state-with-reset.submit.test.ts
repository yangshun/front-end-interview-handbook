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

  test('set state with updater', () => {
    const { result } = renderHook(() => useStateWithReset(0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  test('initial state with initializer', () => {
    const initialState = 1;
    const { result } = renderHook(() => useStateWithReset(() => initialState));

    expect(result.current[0]).toBe(initialState);
  });

  test('initial state should be stable across renders', () => {
    const INITIAL_STATE = 1;

    const { result } = renderHook(() => {
      const [initialState, setInitializer] = useState(INITIAL_STATE);
      const state = useStateWithReset(initialState);

      return { state, setInitializer };
    });

    expect(result.current.state[0]).toBe(INITIAL_STATE);

    act(() => {
      result.current.setInitializer(2);
    });

    expect(result.current.state[0]).toBe(INITIAL_STATE);

    act(() => {
      result.current.state[2]();
    });

    expect(result.current.state[0]).toBe(INITIAL_STATE);
  });

  test('initial state with initializer should be stable across renders', () => {
    const INITIAL_STATE = 1;

    const { result } = renderHook(() => {
      const [initialState, setInitializer] = useState(INITIAL_STATE);
      const state = useStateWithReset(() => initialState);

      return { state, setInitializer };
    });

    expect(result.current.state[0]).toBe(INITIAL_STATE);

    act(() => {
      result.current.setInitializer(2);
    });

    expect(result.current.state[0]).toBe(INITIAL_STATE);

    act(() => {
      result.current.state[2]();
    });

    expect(result.current.state[0]).toBe(INITIAL_STATE);
  });
});
