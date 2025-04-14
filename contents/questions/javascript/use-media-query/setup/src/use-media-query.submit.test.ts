import { act, renderHook } from '@testing-library/react';

import useMediaQuery from './use-media-query';

let changeListeners: (() => void)[] = [];

class MockMatchMedia {
  readonly media: string;

  constructor(query: string) {
    this.media = query;
  }

  get matches() {
    if (this.media.includes('min-width')) {
      return window.innerWidth >= parseInt(this.media.match(/\d+/)![0]);
    }

    if (this.media.includes('max-width')) {
      return window.innerWidth <= parseInt(this.media.match(/\d+/)![0]);
    }
  }

  addEventListener(type: string, listener: () => void) {
    if (type !== 'change') {
      return;
    }

    changeListeners.push(listener);
  }

  removeEventListener(type: string, listener: () => void) {
    if (type !== 'change') {
      return;
    }

    changeListeners.splice(changeListeners.indexOf(listener), 1);
  }

  dispatchEvent(event: Event) {
    if (event.type !== 'change') {
      return;
    }

    changeListeners.forEach((listener) => listener());
  }
}

describe('useMediaQuery', () => {
  beforeEach(() => {
    changeListeners = [];

    // @ts-ignore
    Object.defineProperty(global.window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => {
        return new MockMatchMedia(query);
      }),
    });
  });

  test('return values', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1000px)'));

    expect(typeof result.current).toBe('boolean');
  });

  test('min-width', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1000px)'));

    expect(result.current).toBe(window.innerWidth >= 1000);
  });

  test('max-width', () => {
    const { result } = renderHook(() => useMediaQuery('(max-width: 1000px)'));

    expect(result.current).toBe(window.innerWidth <= 1000);
  });

  test('resize min-width', () => {
    const query = `(min-width: ${window.innerWidth}px)`;
    const { result } = renderHook(() => useMediaQuery(query));

    expect(result.current).toBe(true);

    act(() => {
      window.innerWidth -= 100;
      window.matchMedia(query).dispatchEvent(new Event('change'));
    });

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth += 200;
      window.matchMedia(query).dispatchEvent(new Event('change'));
    });

    expect(result.current).toBe(true);
  });

  test('resize max-width', () => {
    const query = `(max-width: ${window.innerWidth}px)`;
    const { result } = renderHook(() => useMediaQuery(query));

    expect(result.current).toBe(true);

    act(() => {
      window.innerWidth += 100;
      window.matchMedia(query).dispatchEvent(new Event('change'));
    });

    expect(result.current).toBe(false);

    act(() => {
      window.innerWidth -= 200;
      window.matchMedia(query).dispatchEvent(new Event('change'));
    });

    expect(result.current).toBe(true);
  });

  test('removes event listeners on unmount', () => {
    const { unmount } = renderHook(() => useMediaQuery('(min-width: 1000px)'));

    expect(changeListeners).not.toHaveLength(0);

    unmount();

    expect(changeListeners).toHaveLength(0);
  });
});
