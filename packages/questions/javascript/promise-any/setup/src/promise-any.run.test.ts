import promiseAny from './promise-any';

describe('promiseAny', () => {
  test('empty input array', async () => {
    expect.assertions(2);

    try {
      await promiseAny([]);
    } catch (err: any) {
      expect(err).toBeInstanceOf(AggregateError);
      expect(err.errors).toEqual([]);
    }
  });

  test('one promise', async () => {
    expect.assertions(1);
    const p0 = 2;

    const res = await promiseAny([p0]);
    expect(res).toEqual(2);
  });

  test('multiple promises', async () => {
    expect.assertions(1);
    const p0 = new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 200);
    });
    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, 100);
    });
    const p2 = new Promise((resolve) => {
      setTimeout(() => {
        resolve(3);
      }, 10);
    });

    const res = await promiseAny([p0, p1, p2]);
    expect(res).toEqual(3);
  });
});
