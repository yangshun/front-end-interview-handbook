import React from 'react';
import { act, fireEvent, render, renderHook } from '@testing-library/react';

import useClickOutside from './use-click-outside';
import { useRef } from 'react';

describe('useClickOutside', () => {
  test('return values', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useClickOutside(ref, () => {});
    });

    expect(result.current).toBe(undefined);
  });

  test('click outside', () => {
    const handler = jest.fn();

    const Component = () => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);

      return (
        <main>
          <div ref={ref} data-testid="target">
            target
          </div>
          <div data-testid="other">something else</div>
        </main>
      );
    };

    const page = render(<Component />);
    const target = page.getByTestId('target');
    const other = page.getByTestId('other');

    expect(handler).not.toHaveBeenCalled();

    act(() => fireEvent.mouseDown(other));

    expect(handler).toHaveBeenCalledTimes(1);

    act(() => fireEvent.mouseDown(target));

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
