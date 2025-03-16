import React from 'react';
import { act, fireEvent, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useKeyPress from './use-key-press';

describe('useKeyPress', () => {
  test('return values', () => {
    const { result } = renderHook(() => useKeyPress('', () => {}));

    expect(result.current).toBe(undefined);
  });

  test('triggers on key press', () => {
    const user = userEvent.setup();

    const callback = jest.fn();
    renderHook(() => useKeyPress('a', callback));

    act(() => {
      user.keyboard('a');
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not trigger on different key press', () => {
    const user = userEvent.setup();

    const callback = jest.fn();
    renderHook(() => useKeyPress('a', callback));

    act(() => {
      user.keyboard('b');
    });

    expect(callback).not.toHaveBeenCalled();
  });

  test('does not trigger on other target', () => {
    const user = userEvent.setup();

    const callback = jest.fn();
    const page = render(<input type="text" />);
    const input = page.getByRole('textbox');
    renderHook(() => useKeyPress('a', callback, { target: input }));

    act(() => {
      user.keyboard('a');
    });

    expect(callback).not.toHaveBeenCalled();
  });

  test('triggers with other target', () => {
    const callback = jest.fn();
    const page = render(<input type="text" />);
    const input = page.getByRole('textbox');
    renderHook(() => useKeyPress('a', callback, { target: input }));

    act(() => {
      fireEvent.keyDown(input, { key: 'a' });
      fireEvent.keyPress(input, { key: 'a' });
    });

    expect(callback).toHaveBeenCalled();
  });

  test('triggers on keyup if specified', () => {
    const callback = jest.fn();
    renderHook(() => useKeyPress('a', callback, { event: 'keyup' }));

    act(() => {
      fireEvent.keyUp(window, { key: 'a' });
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('does not trigger if unmounted', () => {
    const callback = jest.fn();
    const { unmount } = renderHook(() => useKeyPress('a', callback));

    unmount();

    act(() => {
      fireEvent.keyDown(window, { key: 'a' });
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
