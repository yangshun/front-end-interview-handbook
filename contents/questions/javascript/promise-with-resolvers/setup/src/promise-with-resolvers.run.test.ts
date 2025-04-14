import promiseWithResolvers from './promise-with-resolvers';

// TODO: fix tests passing even if resolved value is incorrect.
describe('promiseWithResolvers', () => {
  test('returns require fields', () => {
    const { promise, reject, resolve } = promiseWithResolvers();

    expect(promise).toBeInstanceOf(Promise);
    expect(resolve).toBeInstanceOf(Function);
    expect(reject).toBeInstanceOf(Function);
  });

  test('resolves', () => {
    const { promise, resolve } = promiseWithResolvers();
    resolve(42);

    return expect(promise).resolves.toBe(42);
  });

  test('rejects', () => {
    const { promise, reject } = promiseWithResolvers();
    reject(42);

    return expect(promise).rejects.toBe(42);
  });
});
