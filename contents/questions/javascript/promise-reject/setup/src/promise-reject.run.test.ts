import promiseReject from './promise-reject';

describe('promiseReject', () => {
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

  test('argument is promise', async () => {
    expect.assertions(1);
    try {
      const p = promiseReject(new Promise((resolve) => resolve(42)));
      expect(p).toBeInstanceOf(Promise);
      await p;
    } catch {}
  });
});
