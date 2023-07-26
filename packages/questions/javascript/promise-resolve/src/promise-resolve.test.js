import promiseResolve from './promise-resolve';
// const promiseResolve = Promise.resolve.bind(Promise);

describe('promiseResolve', () => {
  test('returns promise', () => {
    expect(promiseResolve(1) instanceof Promise).toBe(true);
  });

  describe('non-promise', () => {
    test('returns promise', () => {
      expect(promiseResolve(1) instanceof Promise).toBe(true);
    });

    test('resolves', async () => {
      const p = promiseResolve(42);
      expect(p).resolves.toBe(42);
    });
  });

  describe('promise', () => {
    test('returns promise', () => {
      expect(
        promiseResolve(new Promise((resolve) => resolve(42))) instanceof
          Promise,
      ).toBe(true);
    });

    test('returns the same promise instance', () => {
      const p = new Promise((resolve) => resolve(42));
      expect(promiseResolve(p)).toBe(p);
    });

    test('resolves', async () => {
      const p = promiseResolve(new Promise((resolve) => resolve(42)));
      expect(p).resolves.toBe(42);
    });

    test('nested', async () => {
      const p = promiseResolve(
        new Promise((resolve) =>
          resolve(new Promise((resolve) => resolve(42))),
        ),
      );
      expect(p).resolves.toBe(42);
    });

    test('rejects', async () => {
      const p = promiseResolve(new Promise((_, reject) => reject(42)));
      expect(p).rejects.toBe(42);
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
          then(resolve) {
            resolve(42);
          },
        }) instanceof Promise,
      ).toBe(true);
    });

    test('resolves', async () => {
      const p = promiseResolve({
        then(resolve) {
          resolve(42);
        },
      });
      expect(p).resolves.toBe(42);
    });

    test('throw', async () => {
      const p = promiseResolve({
        then(resolve) {
          throw 42;
        },
      });
      expect(p).rejects.toBe(42);
    });

    test('throw after resolving', async () => {
      const p = promiseResolve({
        then(resolve) {
          resolve(42);
          throw 42;
        },
      });
      expect(p).resolves.toBe(42);
    });

    test('rejects', async () => {
      const p = promiseResolve({
        then(_, reject) {
          reject(42);
        },
      });
      expect(p).rejects.toBe(42);
    });

    test('use with then', (done) => {
      expect.assertions(1);
      const p = promiseResolve({
        then(resolve) {
          resolve(42);
        },
      });
      p.then((result) => {
        expect(result).toBe(42);
        done();
      });
    });

    test('nested', async () => {
      const p = promiseResolve({
        then(resolve) {
          resolve({
            then(resolve) {
              resolve(42);
            },
          });
        },
      });
      expect(p).resolves.toBe(42);
    });

    test('can access `this`', async () => {
      const p = promiseResolve({
        value: 42,
        then(resolve) {
          resolve(this.value);
        },
      });
      expect(p).resolves.toBe(42);
    });
  });

  test('use with Promise.all()', async () => {
    const p0 = promiseResolve(3);
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 100);
    });

    expect(Promise.all([p0, p1])).resolves.toBe([3, 'foo']);
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
