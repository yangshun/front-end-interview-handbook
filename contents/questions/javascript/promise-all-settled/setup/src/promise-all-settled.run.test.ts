import promiseAllSettled from './promise-all-settled';

describe('promiseAllSettled', () => {
  test('returns promise', () => {
    const p = promiseAllSettled([]);
    expect(p).toBeInstanceOf(Promise);
  });

  test('empty input array', async () => {
    expect.assertions(1);
    const res = await promiseAllSettled([]);
    expect(res).toEqual([]);
  });

  test('one promise', async () => {
    expect.assertions(1);
    const p0 = 2;

    const res = await promiseAllSettled([p0]);
    expect(res).toEqual([
      {
        status: 'fulfilled',
        value: 2,
      },
    ]);
  });

  test('mix of resolve and reject', async () => {
    expect.assertions(1);
    const p0 = Promise.resolve(42);
    const p1 = new Promise((_, reject) => {
      setTimeout(() => {
        reject(2);
      }, 10);
    });

    const res = await promiseAllSettled([p0, p1]);
    expect(res).toEqual([
      {
        status: 'fulfilled',
        value: 42,
      },
      {
        status: 'rejected',
        reason: 2,
      },
    ]);
  });
});
