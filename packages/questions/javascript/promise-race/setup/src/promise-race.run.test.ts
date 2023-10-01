import promiseRace from './promise-race';

describe('promiseRace', () => {
  test('returns a promise', () => {
    const promise = promiseRace([]);
    expect(promise).toBeInstanceOf(Promise);
  });

  test('empty input array', (done) => {
    expect.assertions(1);
    const promise = promiseRace([]);
    expect(promise).toBeInstanceOf(Promise);
    promise.then(
      (value) => {
        expect(value).toBeTruthy();
      },
      (reason) => {
        expect(reason).toBeTruthy();
      },
    );

    setTimeout(() => {
      done();
    }, 10);
  });

  test('one promise', async () => {
    expect.assertions(1);
    const p0 = 2;

    const res = await promiseRace([p0]);
    expect(res).toEqual(2);
  });

  test('mix of resolve and reject', async () => {
    expect.assertions(1);
    const p0 = Promise.resolve(42);
    const p1 = new Promise((_, reject) => {
      setTimeout(() => {
        reject(2);
      }, 10);
    });

    const res = await promiseRace([p0, p1]);
    expect(res).toEqual(42);
  });
});
