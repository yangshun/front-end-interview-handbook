import { act, renderHook } from '@testing-library/react';

import useBoolean from './use-boolean-ii';

describe('useBoolean', () => {
  test('return values', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current.value).toBe(false);
    expect(typeof result.current.setTrue).toBe('function');
    expect(typeof result.current.setFalse).toBe('function');
  });

  describe('initial values', () => {
    test('initial true', () => {
      const { result } = renderHook(() => useBoolean(true));

      expect(result.current.value).toBe(true);
    });

    test('initial false', () => {
      const { result } = renderHook(() => useBoolean(false));

      expect(result.current.value).toBe(false);
    });
  });

  describe('setTrue', () => {
    test('once', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.setTrue();
      });
      expect(result.current.value).toBe(true);
    });

    test('twice', () => {
      const { result } = renderHook(() => useBoolean(false));

      act(() => {
        result.current.setTrue();
        result.current.setTrue();
      });
      expect(result.current.value).toBe(true);
    });
  });

  describe('setFalse', () => {
    test('once', () => {
      const { result } = renderHook(() => useBoolean(true));

      act(() => {
        result.current.setFalse();
      });
      expect(result.current.value).toBe(false);
    });

    test('twice', () => {
      const { result } = renderHook(() => useBoolean(true));

      act(() => {
        result.current.setFalse();
        result.current.setFalse();
      });
      expect(result.current.value).toBe(false);
    });
  });

  test('integration', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);

    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
  });

  test('memoizes functions', () => {
    const { result, rerender } = renderHook(() => useBoolean());

    const setTrue = result.current.setTrue;
    const setFalse = result.current.setFalse;

    rerender();

    expect(result.current.setTrue).toBe(setTrue);
    expect(result.current.setFalse).toBe(setFalse);
  });
});
