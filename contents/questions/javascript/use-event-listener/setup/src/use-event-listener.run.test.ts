import { act, fireEvent, renderHook } from '@testing-library/react';

import useEventListener from './use-event-listener';

describe('useEventListener', () => {
  test('return values', () => {
    const { result } = renderHook(() => useEventListener('click', () => {}));

    expect(result.current).toBe(undefined);
  });

  test('click', () => {
    const handler = jest.fn();
    renderHook(() => useEventListener('click', handler));

    act(() => fireEvent.click(window));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
