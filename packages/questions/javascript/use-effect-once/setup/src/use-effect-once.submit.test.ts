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

  test('cleanup function works', () => {
    let counter = 0;

    const { unmount } = renderHook(() =>
      useEffectOnce(() => {
        counter += 1;

        return () => {
          counter += 1;
        };
      }),
    );

    expect(counter).toBe(1);

    unmount();

    expect(counter).toBe(2);
  });

  test('calls the effect once across unmounts', () => {
    let counter = 0;

    const { rerender } = renderHook(
      () =>
        useEffectOnce(() => {
          counter += 1;
        }),
      // We could have used `configure({ reactStrictMode: true })` in @testing-library/react@14.2.0+
      { wrapper: StrictMode },
    );

    expect(counter).toBe(1);

    rerender();

    expect(counter).toBe(1);
  });
});
