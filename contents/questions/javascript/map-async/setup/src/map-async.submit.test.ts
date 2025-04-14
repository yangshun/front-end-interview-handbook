import mapAsync from './map-async';

const asyncIdentity = (x: number) => Promise.resolve(x);
const asyncDouble = (x: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });
const asyncSquare = (x: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * x);
    }, 10);
  });
const asyncRejectOdd = (x: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (x % 2 === 1) {
        reject(x * 3);
      }

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

  test('single item', async () => {
    expect.assertions(1);
    const res = await mapAsync([3], asyncDouble);
    expect(res).toEqual([6]);
  });

  describe('multiple items', () => {
    test('two items', async () => {
      expect.assertions(1);
      const res = await mapAsync([1, 2], asyncDouble);
      expect(res).toEqual([2, 4]);
    });

    test('three items', async () => {
      expect.assertions(1);
      const res = await mapAsync([2, 3, 4], asyncSquare);
      expect(res).toEqual([4, 9, 16]);
    });

    test('some rejected', async () => {
      expect.assertions(1);
      await expect(mapAsync([2, 3], asyncRejectOdd)).rejects.toBe(9);
    });
  });
});
