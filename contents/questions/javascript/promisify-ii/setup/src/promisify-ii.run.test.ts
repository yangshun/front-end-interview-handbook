import promisify from './promisify-ii';

describe('promisify', () => {
  function delayedResolve(cb: Function) {
    setTimeout(() => {
      cb(null, 42);
    }, 10);
  }

  test('returns a function', () => {
    const promisified = promisify(delayedResolve);
    expect(promisified).toBeInstanceOf(Function);
  });

  test('calling promisified returns a promise', () => {
    const promisified = promisify(delayedResolve);
    expect(promisified()).toBeInstanceOf(Promise);
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

  test('custom promisify', async () => {
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
});
