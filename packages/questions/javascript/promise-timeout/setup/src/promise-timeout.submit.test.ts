import promiseTimeout from './promise-timeout';

describe('promiseTimeout', () => {
  test('returns a promise', () => {
    const promise = promiseTimeout(Promise.resolve(1), 100);
    expect(promise).toBeInstanceOf(Promise);
  });

  describe('settled', () => {
    describe('resolved', () => {
      test('immediately', async () => {
        const promise = promiseTimeout(Promise.resolve(42), 100);
        await expect(promise).resolves.toBe(42);
      });

      test('next tick', async () => {
        const promise = promiseTimeout(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(42);
            }, 0);
          }),
          100,
        );
        await expect(promise).resolves.toBe(42);
      });

      test('before timeout', async () => {
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
    });

    describe('rejected', () => {
      test('immediately', async () => {
        const promise = promiseTimeout(Promise.reject(42), 100);
        await expect(promise).rejects.toBe(42);
      });

      test('next tick', async () => {
        const promise = promiseTimeout(
          new Promise((_, reject) => {
            setTimeout(() => {
              reject(42);
            }, 0);
          }),
          100,
        );
        await expect(promise).rejects.toBe(42);
      });

      test('before timeout', async () => {
        const promise = promiseTimeout(
          new Promise((_, reject) => {
            setTimeout(() => {
              reject(42);
            }, 50);
          }),
          100,
        );
        await expect(promise).rejects.toBe(42);
      });
    });
  });

  describe('timeout', () => {
    test('immediate', async () => {
      const promise = promiseTimeout(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(42);
          }, 500);
        }),
        0,
      );

      await expect(promise).rejects.toBe('Promise timeout');
    });

    test('all immediate', async () => {
      const promise = promiseTimeout(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(42);
          }, 0);
        }),
        0,
      );
      await expect(promise).resolves.toBe(42);
    });

    test('non-immediate', async () => {
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
});
