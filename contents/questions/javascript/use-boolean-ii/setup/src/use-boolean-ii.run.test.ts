import { act, renderHook } from '@testing-library/react';

import useBoolean from './use-boolean-ii';

describe('useBoolean', () => {
  test('return values', () => {
    const { result } = renderHook(() => useBoolean());

    expect(result.current.value).toBe(false);
    expect(typeof result.current.setTrue).toBe('function');
    expect(typeof result.current.setFalse).toBe('function');
  });

  test('initial true', () => {
    const { result } = renderHook(() => useBoolean(true));

    expect(result.current.value).toBe(true);
  });

  test('setFalse', () => {
    const { result } = renderHook(() => useBoolean(true));

    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });
});
