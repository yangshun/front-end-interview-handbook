import promisify from './promisify';

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

  test('returns a function', () => {
    const promisified = promisify(delayedResolve);
    expect(promisified).toBeInstanceOf(Function);
  });

  test('calling promisified returns a promise', () => {
    const promisified = promisify(delayedResolve);
    expect(promisified()).toBeInstanceOf(Promise);
  });

  test('one argument', async () => {
    function asyncIdentity<T>(x: T, cb: Function) {
      setTimeout(() => {
        cb(null, x);
      }, 10);
    }

    expect.assertions(1);
    const promisified = promisify(asyncIdentity);
    const res = await promisified(23);
    expect(res).toBe(23);
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
