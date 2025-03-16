import { act, fireEvent, renderHook } from '@testing-library/react';

import createBreakpoint from './use-breakpoint';

const breakpoints = { sm: 40, lg: 64, xl: 80 };

const getCurrentBreakpoint = (width: number) =>
  Object.entries(breakpoints).reduce(
    (acc, [name, size]) => (width >= size ? name : acc),
    'sm',
  );

describe('useBreakpoint', () => {
  test('return values', () => {
    const { result } = renderHook(() => createBreakpoint(breakpoints)());

    expect(typeof result.current).toBe('string');
  });

  test('initial value', () => {
    const { result } = renderHook(() => createBreakpoint(breakpoints)());

    expect(result.current).toBe(getCurrentBreakpoint(window.innerWidth));
  });

  test('resize', () => {
    const { result } = renderHook(() => createBreakpoint(breakpoints)());

    act(() => {
      window.innerWidth = 50;
      fireEvent.resize(window);
    });

    expect(result.current).toBe(getCurrentBreakpoint(50));
  });
});
