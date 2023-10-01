import promiseMerge from './promise-merge';

describe('promiseMerge', () => {
  test('returns a promise', () => {
    const promise = promiseMerge(Promise.resolve(1), Promise.resolve(2));
    expect(promise).toBeInstanceOf(Promise);
  });

  test('numbers', async () => {
    const promise = promiseMerge(
      new Promise((resolve) => setTimeout(() => resolve(21), 10)),
      new Promise((resolve) => setTimeout(() => resolve(22), 5)),
    );
    await expect(promise).resolves.toBe(43);
  });

  test('arrays', async () => {
    const promise = promiseMerge(
      new Promise((resolve) => setTimeout(() => resolve([1, 2, 3]), 5)),
      new Promise((resolve) => setTimeout(() => resolve([4, 5, 6]), 10)),
    );
    await expect(promise).resolves.toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('objects', async () => {
    const promise = promiseMerge(
      new Promise((resolve) => setTimeout(() => resolve({ foo: 1 }), 5)),
      new Promise((resolve) => setTimeout(() => resolve({ bar: 2 }), 10)),
    );
    await expect(promise).resolves.toEqual({ bar: 2, foo: 1 });
  });
});
