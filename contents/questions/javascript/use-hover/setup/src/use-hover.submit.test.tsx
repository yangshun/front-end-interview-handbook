import React from 'react';
import { act, render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useHover from './use-hover';

const Component = () => {
  const [ref, hovering] = useHover();

  return (
    <main>
      <div ref={ref} data-testid="area">
        Hover me
      </div>

      <div data-testid="nonarea">something else</div>

      {hovering && <div data-testid="hovering">Hovering</div>}
    </main>
  );
};

describe('useHover', () => {
  test('return values', () => {
    const { result } = renderHook(() => useHover());

    expect(Array.isArray(result.current)).toBe(true);
    expect(result.current.length).toBe(2);
    expect(typeof result.current[0]).toBe('function');
    expect(typeof result.current[1]).toBe('boolean');
  });

  test('hover', async () => {
    const user = userEvent.setup();
    const page = render(<Component />);
    const area = page.getByTestId('area');

    await act(() => user.hover(area));

    expect(page.queryByTestId('hovering')).not.toBeNull();

    await act(() => user.unhover(area));

    expect(page.queryByTestId('hovering')).toBeNull();
  });

  test('does not trigger when not hovering on area', () => {
    const user = userEvent.setup();
    const page = render(<Component />);
    const nonArea = page.getByTestId('nonarea');

    act(() => user.hover(nonArea));

    expect(page.queryByTestId('hovering')).toBeNull();
  });
});
