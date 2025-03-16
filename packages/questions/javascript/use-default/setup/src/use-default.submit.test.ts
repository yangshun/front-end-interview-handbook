import { act, renderHook } from '@testing-library/react';

import useDefault from './use-default';

describe('useDefault', () => {
  test('initial values', () => {
    const defaultValue = 1;
    const initialValue = 2;

    const { result } = renderHook(() => useDefault(defaultValue, initialValue));

    expect(result.current[0]).toBe(initialValue);
    expect(typeof result.current[1]).toBe('function');
  });

  test('default value when null', () => {
    const defaultValue = 1;
    const initialValue = 2;

    const { result } = renderHook(() => useDefault(defaultValue, initialValue));

    act(() => {
      result.current[1](null);
    });

    expect(result.current[0]).toBe(defaultValue);
  });

  test('default value when undefined', () => {
    const defaultValue = 1;
    const initialValue = 2;

    const { result } = renderHook(() => useDefault(defaultValue, initialValue));

    act(() => {
      result.current[1](undefined);
    });

    expect(result.current[0]).toBe(defaultValue);
  });

  test('not default value when 0', () => {
    const defaultValue = 1;
    const initialValue = 2;

    const { result } = renderHook(() => useDefault(defaultValue, initialValue));

    act(() => {
      result.current[1](0);
    });

    expect(result.current[0]).not.toBe(defaultValue);
  });

  test('not default value when false', () => {
    const defaultValue = true;
    const initialValue = true;

    const { result } = renderHook(() => useDefault(defaultValue, initialValue));

    act(() => {
      result.current[1](false);
    });

    expect(result.current[0]).not.toBe(defaultValue);
  });

  test('can set value', () => {
    const defaultValue = 1;
    const initialValue = 2;

    const { result } = renderHook(() => useDefault(defaultValue, initialValue));

    act(() => {
      result.current[1](3);
    });

    expect(result.current[0]).toBe(3);
  });

  test('can set value with function', () => {
    const defaultValue = 1;
    const initialValue = 2;

    const { result } = renderHook(() => useDefault(defaultValue, initialValue));

    act(() => {
      // @ts-ignore
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(3);
  });

  test('works with non-integers', () => {
    const defaultValue = 'hello';
    const initialValue = 'world';

    const { result } = renderHook(() => useDefault(defaultValue, initialValue));

    act(() => {
      result.current[1]('test');
    });

    expect(result.current[0]).toBe('test');

    act(() => {
      result.current[1]((prev) => prev + '!');
    });

    expect(result.current[0]).toBe('test!');
  });
});
