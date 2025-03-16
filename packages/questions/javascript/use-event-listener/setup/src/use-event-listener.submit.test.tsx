import React, { useRef } from 'react';
import { act, fireEvent, render, renderHook } from '@testing-library/react';

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

  test('click element', async () => {
    const handler = jest.fn();

    const Component = () => {
      const ref = useRef<HTMLDivElement>(null);
      useEventListener('click', handler, ref);

      return <div ref={ref} data-testid="div" />;
    };

    const page = render(<Component />);
    const div = page.getByTestId('div');

    expect(handler).not.toHaveBeenCalled();

    act(() => fireEvent.click(div));

    expect(handler).toHaveBeenCalledTimes(1);

    act(() => fireEvent.click(div));

    expect(handler).toHaveBeenCalledTimes(2);
  });

  test('mouseover element', async () => {
    const handler = jest.fn();

    const Component = () => {
      const ref = useRef<HTMLDivElement>(null);
      useEventListener('mouseover', handler, ref);

      return <div ref={ref} data-testid="div" />;
    };

    const page = render(<Component />);
    const div = page.getByTestId('div');

    expect(handler).not.toHaveBeenCalled();

    act(() => fireEvent.mouseOver(div));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('options', async () => {
    const handler = jest.fn();

    const Component = () => {
      const ref = useRef<HTMLDivElement>(null);
      useEventListener('click', handler, ref, { once: true });

      return <div ref={ref} data-testid="div" />;
    };

    const page = render(<Component />);
    const div = page.getByTestId('div');

    expect(handler).not.toHaveBeenCalled();

    act(() => fireEvent.click(div));

    expect(handler).toHaveBeenCalledTimes(1);

    act(() => fireEvent.click(div));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('remove listener on unmount', async () => {
    const handler = jest.fn();
    const { unmount } = renderHook(() => useEventListener('click', handler));

    act(() => fireEvent.click(window));

    expect(handler).toHaveBeenCalledTimes(1);

    unmount();
    act(() => fireEvent.click(window));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
