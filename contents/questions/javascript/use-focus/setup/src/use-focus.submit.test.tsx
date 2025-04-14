import React from 'react';
import { act, render, renderHook } from '@testing-library/react';

import useFocus from './use-focus';

const Component = () => {
  const [ref, focus] = useFocus<HTMLInputElement>();

  return (
    <main>
      <input type="text" ref={ref} data-testid="input" />

      <button onClick={focus} data-testid="button">
        Focus
      </button>
    </main>
  );
};

describe('useFocus', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis.window, 'requestAnimationFrame', {
      value: (cb: FrameRequestCallback) => cb(0),
    });
  });

  test('return values', () => {
    const { result } = renderHook(() => useFocus());

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBe(2);
    expect(typeof result.current[0]).toBe('object');
    expect(typeof result.current[1]).toBe('function');
  });

  test('focus', () => {
    const page = render(<Component />);
    const input = page.getByTestId('input');
    const button = page.getByTestId('button');

    expect(document.activeElement).not.toBe(input);

    act(() => button.click());

    expect(document.activeElement).toBe(input);
  });
});
