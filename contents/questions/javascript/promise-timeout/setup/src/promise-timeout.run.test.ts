import promiseTimeout from './promise-timeout';

describe('promiseTimeout', () => {
  test('returns a promise', () => {
    const promise = promiseTimeout(Promise.resolve(1), 100);
    expect(promise).toBeInstanceOf(Promise);
  });

  test('resolves before timeout', async () => {
    const promise = promiseTimeout(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(42);
        }, 50);
      }),
      100,
    );
    await expect(promise).resolves.toBe(42);
  });

  test('timeout', async () => {
    const promise = promiseTimeout(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(42);
        }, 200);
      }),
      100,
    );
    await expect(promise).rejects.toBe('Promise timeout');
  });
});
