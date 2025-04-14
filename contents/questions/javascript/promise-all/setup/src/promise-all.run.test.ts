import promiseAll from './promise-all';

describe('promiseAll', () => {
  test('returns promise', () => {
    const p = promiseAll([]);
    expect(p).toBeInstanceOf(Promise);
  });

  test('empty input array', async () => {
    expect.assertions(1);
    const res = await promiseAll([]);
    expect(res).toEqual([]);
  });

  test('resolved', async () => {
    expect.assertions(1);
    const p0 = Promise.resolve(2);
    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve(3);
      }, 10);
    });

    const res = await promiseAll([p0, p1]);
    expect(res).toEqual([2, 3]);
  });

  test('rejected', async () => {
    expect.assertions(1);
    const p0 = Promise.reject(2);
    const p1 = Promise.reject(3);

    await expect(promiseAll([p0, p1])).rejects.toBe(2);
  });
});
