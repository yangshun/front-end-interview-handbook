import promiseResolve from './promise-resolve';

describe('promiseResolve', () => {
  test('returns promise', () => {
    expect(promiseResolve(1) instanceof Promise).toBe(true);
  });

  test('returns the value', () => {
    const p = promiseResolve(42);
    return expect(p).resolves.toBe(42);
  });

  test('returns the same promise instance', () => {
    const p = new Promise((resolve) => resolve(42));
    expect(promiseResolve(p)).toBe(p);
  });

  test('thenable', () => {
    const p = promiseResolve({
      then(resolve: Function) {
        resolve(42);
      },
    });

    return expect(p).resolves.toBe(42);
  });
});
