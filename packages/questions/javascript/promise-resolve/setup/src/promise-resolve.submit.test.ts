import promiseResolve from './promise-resolve';

// TODO: fix tests passing even if resolved value is incorrect.
describe('promiseResolve', () => {
  test('returns promise', () => {
    expect(promiseResolve(1)).toBeInstanceOf(Promise);
  });

  describe('non-promise', () => {
    test('returns promise', () => {
      expect(promiseResolve(1)).toBeInstanceOf(Promise);
    });

    test('resolves', () => {
      const p = promiseResolve(42);
      return expect(p).resolves.toBe(42);
    });
  });

  describe('promise', () => {
    test('returns promise', () => {
      expect(
        promiseResolve(new Promise((resolve) => resolve(42))),
      ).toBeInstanceOf(Promise);
    });

    test('returns the same promise instance', () => {
      const p = new Promise((resolve) => resolve(42));
      expect(promiseResolve(p)).toBe(p);
    });

    test('resolves', () => {
      const p = promiseResolve(new Promise((resolve) => resolve(42)));
      return expect(p).resolves.toBe(42);
    });

    test('nested', () => {
      const p = promiseResolve(
        new Promise((resolve) =>
          resolve(new Promise((resolve) => resolve(42))),
        ),
      );
      return expect(p).resolves.toBe(42);
    });

    test('rejects', () => {
      const p = promiseResolve(new Promise((_, reject) => reject(42)));
      return expect(p).rejects.toBe(42);
    });

    test('use with then', (done) => {
      expect.assertions(1);
      const p = promiseResolve(new Promise((resolve) => resolve(42)));
      p.then((result) => {
        expect(result).toBe(42);
        done();
      });
    });
  });

  describe('thenable', () => {
    test('returns promise', () => {
      expect(
        promiseResolve({
          then(resolve: Function) {
            resolve(42);
          },
        }),
      ).toBeInstanceOf(Promise);
    });

    test('resolves', () => {
      const p = promiseResolve({
        then(resolve: Function) {
          resolve(42);
        },
      });
      return expect(p).resolves.toBe(42);
    });

    test('throw', () => {
      const p = promiseResolve({
        then() {
          throw 42;
        },
      });
      return expect(p).rejects.toBe(42);
    });

    test('throw after resolving', () => {
      const p = promiseResolve({
        then(resolve: Function) {
          resolve(42);
          throw 42;
        },
      });
      return expect(p).resolves.toBe(42);
    });

    test('rejects', () => {
      const p = promiseResolve({
        then(_, reject: Function) {
          reject(42);
        },
      });
      return expect(p).rejects.toBe(42);
    });

    test('use with then', (done) => {
      expect.assertions(1);
      const p = promiseResolve({
        then(resolve: Function) {
          resolve(42);
        },
      });
      p.then((result) => {
        expect(result).toBe(42);
        done();
      });
    });

    test('nested', () => {
      const p = promiseResolve({
        then(resolve: Function) {
          resolve({
            then(resolve: Function) {
              resolve(42);
            },
          });
        },
      });
      return expect(p).resolves.toBe(42);
    });

    test('can access `this`', () => {
      const p = promiseResolve({
        value: 42,
        then(this: any, resolve: Function) {
          resolve(this.value);
        },
      });
      return expect(p).resolves.toBe(42);
    });
  });

  test('use with Promise.all()', () => {
    const p0 = promiseResolve(3);
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 100);
    });

    return expect(Promise.all([p0, p1])).resolves.toStrictEqual([3, 'foo']);
  });

  test('use with Promise.allSettled()', async () => {
    const p0 = promiseResolve(2);
    const p1 = promiseResolve(3);

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

  test('use with Promise.any()', async () => {
    const p0 = promiseResolve(2);
    const p1 = new Promise((_, reject) => {
      setTimeout(() => {
        reject(3);
      }, 10);
    });

    const res = await Promise.any([p0, p1]);
    expect(res).toEqual(2);
  });

  test('use with Promise.race()', async () => {
    const p0 = promiseResolve(2);
    const p1 = new Promise((_, reject) => {
      setTimeout(() => {
        reject(3);
      }, 10);
    });

    const res = await Promise.race([p0, p1]);
    expect(res).toEqual(2);
  });
});
