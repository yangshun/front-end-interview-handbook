import promiseReject from './promise-reject';

describe('promiseReject', () => {
  describe('non-promise', () => {
    test('returns promise', async () => {
      expect.assertions(1);
      try {
        const p = promiseReject(1);
        expect(p).toBeInstanceOf(Promise);
        await p;
      } catch {}
    });

    test('rejects', async () => {
      const p = promiseReject(42);
      expect(p).rejects.toBe(42);
    });
  });

  describe('promise', () => {
    test('returns promise', async () => {
      expect.assertions(1);
      try {
        const p = promiseReject(new Promise((resolve) => resolve(42)));
        expect(p).toBeInstanceOf(Promise);
        await p;
      } catch {}
    });

    test('returns different promise instance', async () => {
      expect.assertions(1);
      try {
        const reason = new Promise((resolve) => resolve(42));
        const p = promiseReject(reason);
        expect(p).not.toBe(reason);
        await p;
      } catch {}
    });

    test('rejects', async () => {
      const p = promiseReject(42);
      expect(p).rejects.toBe(42);
    });

    test('use with catch', (done) => {
      expect.assertions(1);
      const p = promiseReject(42);
      p.catch((err) => {
        expect(err).toBe(42);
        done();
      });
    });
  });

  test('use with Promise.all()', async () => {
    const p0 = promiseReject(3);
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 100);
    });

    expect(Promise.all([p0, p1])).rejects.toBe(3);
  });

  test('use with Promise.allSettled()', async () => {
    const p0 = promiseReject(2);
    const p1 = promiseReject(3);

    const res = await Promise.allSettled([p0, p1]);
    expect(res).toEqual([
      {
        status: 'rejected',
        reason: 2,
      },
      {
        status: 'rejected',
        reason: 3,
      },
    ]);
  });

  test('use with Promise.any()', async () => {
    expect.assertions(2);
    const p0 = promiseReject(2);

    try {
      await Promise.any([p0]);
    } catch (err: any) {
      expect(err).toBeInstanceOf(AggregateError);
      expect(err.errors).toEqual([2]);
    }
  });

  test('use with Promise.race()', async () => {
    const p0 = promiseReject(2);
    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve(3);
      }, 10);
    });

    expect(Promise.race([p0, p1])).rejects.toBe(2);
  });
});
