import { act, renderHook } from '@testing-library/react';

import useMap from './use-map';

describe('useMap', () => {
  test('return values', () => {
    const { result } = renderHook(() => useMap());

    expect(result.current.map).toBeInstanceOf(Map);
    expect(typeof result.current.set).toBe('function');
    expect(typeof result.current.setAll).toBe('function');
    expect(typeof result.current.remove).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  test('initial value', () => {
    const initialValue = new Map([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    const { result } = renderHook(() => useMap(initialValue));

    expect(result.current.map).toEqual(initialValue);
  });

  test('set key-value pair', () => {
    const { result } = renderHook(() => useMap());

    act(() => {
      result.current.set('a', 1);
    });

    expect(result.current.map.get('a')).toBe(1);
  });

  test('set all key-value pairs', () => {
    const { result } = renderHook(() => useMap());

    act(() => {
      result.current.setAll([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    expect(result.current.map).toEqual(
      new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]),
    );
  });

  test('remove key-value pair', () => {
    const { result } = renderHook(() =>
      useMap(
        new Map([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ]),
      ),
    );

    act(() => {
      result.current.remove('b');
    });

    expect(result.current.map).toEqual(
      new Map([
        ['a', 1],
        ['c', 3],
      ]),
    );
  });

  test('reset map', () => {
    const { result } = renderHook(() =>
      useMap(
        new Map([
          ['a', 1],
          ['b', 2],
          ['c', 3],
        ]),
      ),
    );

    act(() => {
      result.current.reset();
    });

    expect(result.current.map).toEqual(new Map());
  });
});
