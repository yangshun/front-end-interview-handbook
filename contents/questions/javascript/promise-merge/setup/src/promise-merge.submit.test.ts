import promiseMerge from './promise-merge';

describe('promiseMerge', () => {
  test('returns a promise', () => {
    const promise = promiseMerge(Promise.resolve(1), Promise.resolve(2));
    expect(promise).toBeInstanceOf(Promise);
  });

  describe('resolved', () => {
    describe('numbers', () => {
      test('immediately', async () => {
        const promise = promiseMerge(Promise.resolve(21), Promise.resolve(22));
        await expect(promise).resolves.toBe(43);
      });

      test('delayed', async () => {
        const promise = promiseMerge(
          new Promise((resolve) => setTimeout(() => resolve(21), 10)),
          new Promise((resolve) => setTimeout(() => resolve(22), 5)),
        );
        await expect(promise).resolves.toBe(43);
      });
    });

    describe('strings', () => {
      test('immediately', async () => {
        const promise = promiseMerge(
          Promise.resolve('123'),
          Promise.resolve('456'),
        );
        await expect(promise).resolves.toBe('123456');
      });

      test('delayed', async () => {
        const promise = promiseMerge(
          new Promise((resolve) => setTimeout(() => resolve('123'), 10)),
          new Promise((resolve) => setTimeout(() => resolve('456'), 5)),
        );
        await expect(promise).resolves.toBe('123456');
      });
    });

    describe('arrays', () => {
      test('immediately', async () => {
        const promise = promiseMerge(
          Promise.resolve([1, 2, 3]),
          Promise.resolve([4, 5, 6]),
        );
        await expect(promise).resolves.toEqual([1, 2, 3, 4, 5, 6]);
      });

      test('delayed', async () => {
        const promise = promiseMerge(
          new Promise((resolve) => setTimeout(() => resolve([1, 2, 3]), 5)),
          new Promise((resolve) => setTimeout(() => resolve([4, 5, 6]), 10)),
        );
        await expect(promise).resolves.toEqual([1, 2, 3, 4, 5, 6]);
      });
    });

    describe('objects', () => {
      test('immediately', async () => {
        const promise = promiseMerge(
          Promise.resolve({ foo: 1 }),
          Promise.resolve({ bar: 2 }),
        );
        await expect(promise).resolves.toEqual({ bar: 2, foo: 1 });
      });

      test('delayed', async () => {
        const promise = promiseMerge(
          new Promise((resolve) => setTimeout(() => resolve({ foo: 1 }), 5)),
          new Promise((resolve) => setTimeout(() => resolve({ bar: 2 }), 10)),
        );
        await expect(promise).resolves.toEqual({ bar: 2, foo: 1 });
      });
    });
  });

  describe('rejected', () => {
    test('promises rejected', async () => {
      const promise = promiseMerge(
        new Promise((resolve) => setTimeout(() => resolve(1), 5)),
        new Promise((_, reject) => setTimeout(() => reject(2), 10)),
      );
      await expect(promise).rejects.toEqual(2);
    });

    test('supported data types but not mergeable', async () => {
      const promise = promiseMerge(
        new Promise((resolve) => setTimeout(() => resolve(1), 5)),
        new Promise((resolve) => setTimeout(() => resolve([]), 10)),
      );
      await expect(promise).rejects.toEqual('Unsupported data types');
    });

    test('unsupported data types', async () => {
      const promise = promiseMerge(
        // @ts-expect-error
        new Promise((resolve) => setTimeout(() => resolve(new Set([1]), 5))),
        // @ts-expect-error
        new Promise((resolve) => setTimeout(() => resolve(new Set([2]), 10))),
      );
      await expect(promise).rejects.toEqual('Unsupported data types');
    });
  });
});
