import mapAsyncLimit from './map-async-limit';

const asyncIdentity = (x: number) => Promise.resolve(x);

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

  test('resolved', async () => {
    expect.assertions(1);
    let ongoing = 0;
    const limit = 2;

    const res = await mapAsyncLimit(
      [1, 2, 3, 4, 5],
      (x: number) => {
        ongoing++;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (ongoing > limit) {
              reject('Concurrency limit exceeded');
            }

            resolve(x * 2);
            ongoing--;
          }, 10);
        });
      },
      limit,
    );

    expect(res).toEqual([2, 4, 6, 8, 10]);
  });
});
