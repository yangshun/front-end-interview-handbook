import mapAsync from './map-async';

const asyncIdentity = (x: number) => Promise.resolve(x);
const asyncDouble = (x: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });

describe('mapAsync', () => {
  test('returns promise', () => {
    const p = mapAsync([], asyncIdentity);
    expect(p).toBeInstanceOf(Promise);
  });

  test('empty input array', async () => {
    expect.assertions(1);
    const res = await mapAsync([], asyncIdentity);
    expect(res).toEqual([]);
  });

  test('resolved', async () => {
    expect.assertions(1);
    const res = await mapAsync([1, 2], asyncDouble);
    expect(res).toEqual([2, 4]);
  });
});
