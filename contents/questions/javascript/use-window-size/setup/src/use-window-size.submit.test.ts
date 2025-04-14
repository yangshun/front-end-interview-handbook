import { act, fireEvent, renderHook } from '@testing-library/react';

import useWindowSize from './use-window-size';

describe('useWindowSize', () => {
  test('return values', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(typeof result.current).toBe('object');
    expect(typeof result.current.width).toBe('number');
    expect(typeof result.current.height).toBe('number');
  });

  test('initial value', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  test('resize', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      window.innerWidth = 100;
      window.innerHeight = 200;
      fireEvent.resize(window);
    });

    expect(result.current.width).toBe(100);
    expect(result.current.height).toBe(200);
  });
});
