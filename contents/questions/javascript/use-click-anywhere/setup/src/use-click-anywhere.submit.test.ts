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

  test('calls the handler on multiple clicks', () => {
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

    act(() => {
      fireEvent.click(window);
    });

    expect(counter).toBe(2);
  });

  /**
   * `dblclick` fires after two `click` events, so we need to make sure that the handler is not called
   * for the third time when the user double-clicks.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event
   */
  test('does not call the handler on dblclick event', () => {
    let counter = 0;

    renderHook(() =>
      useClickAnywhere(() => {
        counter += 1;
      }),
    );

    expect(counter).toBe(0);

    act(() => {
      fireEvent.doubleClick(window);
    });

    expect(counter).toBe(0);
  });

  test('does not call the handler on mousedown event', () => {
    let counter = 0;

    renderHook(() =>
      useClickAnywhere(() => {
        counter += 1;
      }),
    );

    expect(counter).toBe(0);

    act(() => {
      fireEvent.mouseDown(window);
    });

    expect(counter).toBe(0);
  });

  test('does not call the handler on mouseup event', () => {
    let counter = 0;

    renderHook(() =>
      useClickAnywhere(() => {
        counter += 1;
      }),
    );

    expect(counter).toBe(0);

    act(() => {
      fireEvent.mouseUp(window);
    });

    expect(counter).toBe(0);
  });

  test('removes the event listener on unmount', () => {
    let counter = 0;

    const { unmount } = renderHook(() =>
      useClickAnywhere(() => {
        counter += 1;
      }),
    );

    expect(counter).toBe(0);

    act(() => {
      fireEvent.click(window);
    });

    expect(counter).toBe(1);

    unmount();

    act(() => {
      fireEvent.click(window);
    });

    expect(counter).toBe(1);
  });
});
