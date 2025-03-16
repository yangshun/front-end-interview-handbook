import { renderHook, waitFor } from '@testing-library/react';

import useQuery from './use-query';

describe('useQuery', () => {
  test('return values', () => {
    const { result } = renderHook(() => useQuery(async () => true));

    expect(typeof result.current).toBe('object');
    expect(result.current).toHaveProperty('status');
  });

  test('loading state', () => {
    const { result } = renderHook(() => useQuery(async () => true));

    expect(result.current.status).toBe('loading');
  });

  test('success state', async () => {
    const { result } = renderHook(() => useQuery(async () => 10));

    await waitFor(() => {
      expect(result.current).toEqual({
        status: 'success',
        data: 10,
      });
    });
  });

  test('error state', async () => {
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
