import mapAsyncLimit from './map-async-limit';

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

describe('mapAsyncLimit', () => {
  test('returns promise', () => {
    const p = mapAsyncLimit([], asyncIdentity);
    expect(p).toBeInstanceOf(Promise);
  });

  test('empty input array', async () => {
    expect.assertions(1);
    const res = await mapAsyncLimit([], asyncIdentity);
    expect(res).toEqual([]);
  });

  test('single item', async () => {
    expect.assertions(1);
    const res = await mapAsyncLimit([3], asyncDouble);
    expect(res).toEqual([6]);
  });

  describe('multiple items', () => {
    describe('no limit', () => {
      test('all resolved', async () => {
        expect.assertions(1);
        const res = await mapAsyncLimit([2, 3, 4, 5, 6], asyncSquare);
        expect(res).toEqual([4, 9, 16, 25, 36]);
      });

      test('some rejected', async () => {
        expect.assertions(1);
        await expect(mapAsyncLimit([2, 3], asyncRejectOdd)).rejects.toBe(9);
      });
    });

    test('limit of one', async () => {
      expect.assertions(1);
      let ongoing = 0;
      const limit = 1;

      const res = await mapAsyncLimit(
        [2, 3, 4, 5, 6],
        (x: number) => {
          ongoing++;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (ongoing > limit) {
                reject('Concurrency limit exceeded');
              }

              resolve(x * x);
              ongoing--;
            }, 10);
          });
        },
        limit,
      );

      expect(res).toEqual([4, 9, 16, 25, 36]);
    });

    test('limit of two', async () => {
      expect.assertions(1);
      let ongoing = 0;
      const limit = 2;

      const res = await mapAsyncLimit(
        [2, 3, 4, 5, 6],
        (x: number) => {
          ongoing++;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (ongoing > limit) {
                reject('Concurrency limit exceeded');
              }

              resolve(x * x);
              ongoing--;
            }, 10);
          });
        },
        limit,
      );

      expect(res).toEqual([4, 9, 16, 25, 36]);
    });

    test('limit more than the input', async () => {
      expect.assertions(1);
      let ongoing = 0;
      const limit = 10;

      const res = await mapAsyncLimit(
        [2, 3, 4, 5, 6],
        (x: number) => {
          ongoing++;
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (ongoing > limit) {
                reject('Concurrency limit exceeded');
              }

              resolve(x * x);
              ongoing--;
            }, 10);
          });
        },
        limit,
      );

      expect(res).toEqual([4, 9, 16, 25, 36]);
    });
  });
});
