import promisify from './promisify-ii';

describe('promisify', () => {
  function delayedResolve(cb: Function) {
    setTimeout(() => {
      cb(null, 42);
    }, 10);
  }

  function asyncError(x: number, cb: Function) {
    setTimeout(() => {
      cb(x);
    }, 10);
  }

  describe('returns correct types', () => {
    test('returns a function', () => {
      const promisified = promisify(delayedResolve);
      expect(promisified).toBeInstanceOf(Function);
    });

    test('calling promisified returns a promise', () => {
      const promisified = promisify(delayedResolve);
      expect(promisified()).toBeInstanceOf(Promise);
    });
  });

  describe('use with await', () => {
    describe('resolved', () => {
      test('no arguments', async () => {
        expect.assertions(1);
        const promisified = promisify(delayedResolve);
        const res = await promisified();
        expect(res).toBe(42);
      });

      test('one argument', async () => {
        function asyncIdentity(x: number, cb: Function) {
          setTimeout(() => {
            cb(null, x);
          }, 10);
        }

        expect.assertions(1);
        const promisified = promisify(asyncIdentity);
        const res = await promisified(23);
        expect(res).toBe(23);
      });

      test('two arguments', async () => {
        function asyncAdd(a: number, b: number, cb: Function) {
          setTimeout(() => {
            cb(null, a + b);
          }, 10);
        }

        expect.assertions(1);
        const promisified = promisify(asyncAdd);
        const res = await promisified(17, 19);
        expect(res).toBe(36);
      });
    });

    test('rejected', async () => {
      expect.assertions(1);
      try {
        const promisified = promisify(asyncError);
        await promisified(23);
      } catch (err) {
        expect(err).toBe(23);
      }
    });
  });

  test('can access `this`', async () => {
    expect.assertions(1);
    function asyncAdd(this: any, a: number, b: number, cb: Function) {
      setTimeout(() => {
        cb(null, a + b + this.base);
      }, 10);
    }

    const promisifiedAdd = promisify(asyncAdd);
    const obj = { base: 5, add: promisifiedAdd };
    const res = await obj.add(17, 19);
    expect(res).toBe(41);
  });

  describe('use without await', () => {
    test('then', (done) => {
      expect.assertions(1);
      const promisified = promisify(delayedResolve);
      promisified().then((res) => {
        expect(res).toBe(42);
        done();
      });
    });

    test('catch', (done) => {
      expect.assertions(1);
      const promisified = promisify(asyncError);
      promisified(23)
        .then()
        .catch((err) => {
          expect(err).toBe(23);
          done();
        });
    });
  });

  describe('custom', () => {
    test('resolve', async () => {
      expect.assertions(1);
      function asyncIdentityCustom<T>(cb: Function, x: T) {
        setTimeout(() => {
          cb(null, x);
        }, 10);
      }
      const customPromisify = <T>(x: T) =>
        new Promise((resolve) => {
          asyncIdentityCustom((_: unknown, res: T) => resolve(res), x);
        });
      (asyncIdentityCustom as any)[Symbol.for('util.promisify.custom')] =
        customPromisify;

      const promisified = promisify(asyncIdentityCustom);
      const res = await promisified(23);
      expect(res).toBe(23);
    });

    test('reject', async () => {
      expect.assertions(1);
      function asyncErrorCustom(cb: Function, x: number) {
        setTimeout(() => {
          cb(x);
        }, 10);
      }
      const customPromisify = (x: number) =>
        new Promise((_, reject) => {
          asyncErrorCustom((err: any) => reject(err), x);
        });
      (asyncErrorCustom as any)[Symbol.for('util.promisify.custom')] =
        customPromisify;

      try {
        const promisified = promisify(asyncErrorCustom);
        await promisified(23);
      } catch (err) {
        expect(err).toBe(23);
      }
    });
  });
});
