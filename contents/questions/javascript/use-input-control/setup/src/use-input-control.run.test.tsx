import { act, renderHook } from '@testing-library/react';

import useInputControl from './use-input-control';

describe('useInputControl', () => {
  test('return values', () => {
    const { result } = renderHook(() => useInputControl(''));

    expect(typeof result.current.value).toBe('string');
    expect(result.current.dirty).toBe(false);
    expect(result.current.touched).toBe(false);
    expect(result.current.different).toBe(false);
    expect(typeof result.current.handleChange).toBe('function');
    expect(typeof result.current.handleBlur).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  describe('value', () => {
    test('initial value', () => {
      const { result } = renderHook(() => useInputControl('initial value'));

      expect(result.current.value).toBe('initial value');
    });

    test('value can be different', () => {
      const value = 'new value';
      const { result } = renderHook(() => useInputControl('initial value'));

      act(() =>
        result.current.handleChange({
          target: { value },
          currentTarget: { value },
        } as any),
      );

      expect(result.current.value).toBe(value);
    });
  });

  test('different', () => {
    const value = 'new value';
    const { result } = renderHook(() => useInputControl('initial value'));

    act(() =>
      result.current.handleChange({
        target: { value },
        currentTarget: { value },
      } as any),
    );

    expect(result.current.different).toBe(true);
  });

  test('dirty', () => {
    const value = 'new value';
    const { result } = renderHook(() => useInputControl('initial value'));

    act(() =>
      result.current.handleChange({
        target: { value },
        currentTarget: { value },
      } as any),
    );

    expect(result.current.dirty).toBe(true);
  });

  test('touched', () => {
    const { result } = renderHook(() => useInputControl('initial value'));

    expect(result.current.touched).toBe(false);

    act(() => result.current.handleBlur());

    expect(result.current.touched).toBe(true);
  });

  test('reset', () => {
    const initialValue = 'initial value';
    const newValue = 'new value';
    const { result } = renderHook(() => useInputControl(initialValue));

    act(() => {
      result.current.handleChange({
        target: { value: newValue },
        currentTarget: { value: newValue },
      } as any);
      result.current.handleBlur();
    });

    expect(result.current.value).toBe(newValue);
    expect(result.current.different).toBe(true);
    expect(result.current.dirty).toBe(true);
    expect(result.current.touched).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.value).toBe(initialValue);
    expect(result.current.different).toBe(false);
    expect(result.current.dirty).toBe(false);
    expect(result.current.touched).toBe(false);
  });
});
