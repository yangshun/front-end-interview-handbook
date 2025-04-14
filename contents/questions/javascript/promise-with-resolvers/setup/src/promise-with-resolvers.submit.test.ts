import promiseWithResolvers from './promise-with-resolvers';

describe('promiseWithResolvers', () => {
  test('returns require fields', () => {
    const { promise, reject, resolve } = promiseWithResolvers();

    expect(promise).toBeInstanceOf(Promise);
    expect(resolve).toBeInstanceOf(Function);
    expect(reject).toBeInstanceOf(Function);
  });

  describe('promise', () => {
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

    test('then', (done) => {
      expect.assertions(1);
      const { promise, resolve } = promiseWithResolvers();
      resolve(42);

      promise.then((result) => {
        expect(result).toBe(42);
        done();
      });
    });
  });

  describe('usage with promise methods', () => {
    test('Promise.all()', () => {
      const { promise: p0, resolve } = promiseWithResolvers();
      const p1 = new Promise((resolve) => {
        setTimeout(() => {
          resolve('foo');
        }, 100);
      });
      resolve(3);

      return expect(Promise.all([p0, p1])).resolves.toStrictEqual([3, 'foo']);
    });

    test('Promise.allSettled()', async () => {
      const { promise: p0, resolve: resolve0 } = promiseWithResolvers();
      const { promise: p1, resolve: resolve1 } = promiseWithResolvers();

      resolve0(2);
      resolve1(3);

      const res = await Promise.allSettled([p0, p1]);

      expect(res).toEqual([
        {
          status: 'fulfilled',
          value: 2,
        },
        {
          status: 'fulfilled',
          value: 3,
        },
      ]);
    });

    test('Promise.any()', async () => {
      const { promise: p0, resolve: resolve0 } = promiseWithResolvers();
      const { promise: p1, reject: reject1 } = promiseWithResolvers();

      resolve0(2);
      reject1(3);

      const res = await Promise.any([p0, p1]);
      expect(res).toEqual(2);
    });

    test('Promise.race()', async () => {
      const { promise: p0, resolve: resolve0 } = promiseWithResolvers();
      const { promise: p1, reject: resolve1 } = promiseWithResolvers();

      resolve0(2);
      resolve1(3);

      const res = await Promise.race([p0, p1]);
      expect(res).toEqual(2);
    });
  });
});
