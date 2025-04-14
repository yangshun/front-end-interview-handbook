import { renderHook, waitFor } from '@testing-library/react';
import FakeTimers from '@sinonjs/fake-timers';

import useQuery from './use-query';

describe('useQuery', () => {
  test('return values', () => {
    const { result } = renderHook(() => useQuery(async () => true));

    expect(typeof result.current).toBe('object');
    expect(result.current).toHaveProperty('status');
  });

  describe('states', () => {
    test('loading', () => {
      const { result } = renderHook(() => useQuery(async () => true));

      expect(result.current.status).toBe('loading');
    });

    test('success', async () => {
      const { result } = renderHook(() => useQuery<number>(async () => 10));

      await waitFor(() => {
        expect(result.current).toEqual({
          status: 'success',
          data: 10,
        });
      });
    });

    test('error', async () => {
      const error = new Error('error');

      const { result } = renderHook(() =>
        useQuery(async () => {
          throw error;
        }),
      );

      await waitFor(() => {
        expect(result.current).toStrictEqual({
          status: 'error',
          error,
        });
      });
    });
  });

  describe('dependency array', () => {
    test('sequential', async () => {
      const { rerender, result } = renderHook(
        ({ deps }) => useQuery(async () => deps, deps),
        {
          initialProps: { deps: [1] },
        },
      );

      expect(result.current.status).toBe('loading');
      await waitFor(() => {
        expect(result.current).toEqual({
          status: 'success',
          data: [1],
        });
      });

      rerender({ deps: [2] });
      expect(result.current.status).toBe('loading');
      await waitFor(() => {
        expect(result.current).toEqual({
          status: 'success',
          data: [2],
        });
      });
    });

    test('overlapping', async () => {
      const fn = jest.fn();
      const clock = FakeTimers.createClock();

      const { rerender, result } = renderHook(
        ({ deps }) =>
          useQuery(
            () =>
              new Promise((resolve) => {
                fn();
                clock.setTimeout(() => resolve(deps), 200);
              }),
            deps,
          ),
        {
          initialProps: { deps: [1] },
        },
      );

      expect(result.current.status).toBe('loading');

      clock.tick(50);

      rerender({ deps: [2] });
      expect(result.current.status).toBe('loading');

      clock.tick(300);

      await waitFor(() => {
        expect(fn).toHaveBeenCalledTimes(2);
        expect(result.current).toEqual({
          status: 'success',
          data: [2],
        });
      });
    });
  });

  describe('cancellation of outdated callbacks', () => {
    test('first resolves after second', async () => {
      const fn = jest.fn();
      const clock = FakeTimers.createClock();

      const { rerender, result } = renderHook(
        ({ deps }) =>
          useQuery(
            () =>
              new Promise((resolve) => {
                fn();
                clock.setTimeout(() => resolve(deps[0]), deps[0]);
              }),
            deps,
          ),
        {
          initialProps: { deps: [500] },
        },
      );

      expect(result.current.status).toBe('loading');

      clock.tick(20);

      rerender({ deps: [200] });
      expect(result.current.status).toBe('loading');

      clock.tick(1000);

      await waitFor(() => {
        expect(fn).toHaveBeenCalledTimes(2);
        expect(result.current).toEqual({
          status: 'success',
          data: 200,
        });
      });
    });

    test('first rejects after second', async () => {
      const fn = jest.fn();
      const clock = FakeTimers.createClock();

      const { rerender, result } = renderHook(
        ({ deps }) =>
          useQuery(
            () =>
              new Promise((resolve, reject) => {
                fn();
                clock.setTimeout(
                  () => (deps[0] > 300 ? resolve(42) : reject(24)),
                  deps[0],
                );
              }),
            deps,
          ),
        {
          initialProps: { deps: [400] },
        },
      );

      expect(result.current.status).toBe('loading');

      clock.tick(20);

      rerender({ deps: [200] });
      expect(result.current.status).toBe('loading');

      clock.tick(1000);

      await waitFor(() => {
        expect(fn).toHaveBeenCalledTimes(2);
        expect(result.current).toEqual({
          status: 'error',
          error: 24,
        });
      });
    });
  });

  test('works with timer', async () => {
    const fn = jest.fn();
    const clock = FakeTimers.createClock();

    const { result } = renderHook(() =>
      useQuery(
        () =>
          new Promise((resolve) => {
            fn();
            clock.setTimeout(() => resolve(true), 1000);
          }),
      ),
    );

    expect(result.current.status).toBe('loading');

    clock.tick(1200);

    await waitFor(() => {
      expect(fn).toHaveBeenCalled();
      expect(result.current.status).toBe('success');
    });
  });

  describe('handle unmounting', () => {
    test('stale resolve', async () => {
      const fn = jest.fn();
      const clock = FakeTimers.createClock();

      const { result, unmount } = renderHook(() =>
        useQuery(
          () =>
            new Promise((resolve) => {
              clock.setTimeout(() => {
                fn();
                resolve(true);
              }, 1000);
            }),
        ),
      );

      expect(result.current.status).toBe('loading');

      unmount();
      clock.tick(1200);

      await waitFor(() => {
        expect(fn).toHaveBeenCalled();
        expect(result.current.status).toBe('loading');
      });
    });

    test('stale reject', async () => {
      const fn = jest.fn();
      const clock = FakeTimers.createClock();

      const { result, unmount } = renderHook(() =>
        useQuery(
          () =>
            new Promise((_, reject) => {
              clock.setTimeout(() => {
                fn();
                reject(true);
              }, 1000);
            }),
        ),
      );

      expect(result.current.status).toBe('loading');

      unmount();
      clock.tick(1200);

      await waitFor(() => {
        expect(fn).toHaveBeenCalled();
        expect(result.current.status).toBe('loading');
      });
    });
  });
});
