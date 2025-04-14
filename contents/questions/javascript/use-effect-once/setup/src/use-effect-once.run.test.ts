import { renderHook } from '@testing-library/react';

import useEffectOnce from './use-effect-once';
import { StrictMode } from 'react';

describe('useEffectOnce', () => {
  test('returns nothing', () => {
    const { result } = renderHook(() => useEffectOnce(() => {}));

    expect(result.current).toBe(undefined);
  });

  test('calls the effect once', () => {
    let counter = 0;

    const { rerender } = renderHook(() =>
      useEffectOnce(() => {
        counter += 1;
      }),
    );

    expect(counter).toBe(1);

    rerender();

    expect(counter).toBe(1);
  });
});
