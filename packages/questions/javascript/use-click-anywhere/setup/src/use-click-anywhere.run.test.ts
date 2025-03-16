import { act, fireEvent, renderHook } from '@testing-library/react';

import useClickAnywhere from './use-click-anywhere';

describe('useClickAnywhere', () => {
  test('returns nothing', () => {
    const { result } = renderHook(() => useClickAnywhere(() => {}));

    expect(result.current).toBe(undefined);
  });

  test('calls the handler when window is clicked', () => {
    let counter = 0;

    renderHook(() =>
      useClickAnywhere(() => {
        counter += 1;
      }),
    );

    expect(counter).toBe(0);

    act(() => {
      fireEvent.click(window);
    });

    expect(counter).toBe(1);
  });
});
