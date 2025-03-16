import { renderHook } from '@testing-library/react';

import useCountdown from './use-countdown';

describe('useCountdown', () => {
  test('return values', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 0 }));

    expect(typeof result.current).toBe('object');
    expect(typeof result.current.count).toBe('number');
    expect(typeof result.current.start).toBe('function');
    expect(typeof result.current.stop).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  test('initial value', () => {
    const { result } = renderHook(() => useCountdown({ countStart: 10 }));

    expect(result.current.count).toBe(10);
  });
});
