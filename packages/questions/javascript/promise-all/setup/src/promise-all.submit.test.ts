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

  describe('one promise', () => {
    describe('resolve', () => {
      test('value', async () => {
        expect.assertions(1);
        const p0 = 2;

        const res = await promiseAll([p0]);
        expect(res).toEqual([2]);
      });

      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);

        const res = await promiseAll([p0]);
        expect(res).toEqual([2]);
      });

      test('delayed', async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 10);
        });

        const res = await promiseAll([p0]);
        expect(res).toEqual([2]);
      });
    });

    describe('reject', () => {
      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(2);

        await expect(promiseAll([p0])).rejects.toBe(2);
      });

      test('delayed', async () => {
        expect.assertions(1);
        const p0 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        await expect(promiseAll([p0])).rejects.toBe(2);
      });
    });
  });

  describe('multiple promises', () => {
    describe('all resolve', () => {
      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);
        const p1 = Promise.resolve(3);

        const res = await promiseAll([p0, p1]);
        expect(res).toEqual([2, 3]);
      });

      test('delayed', async () => {
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

      test('mixture', async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 10);
        });
        const p1 = Promise.resolve(3);
        const p2 = 4;

        const res = await promiseAll([p0, p1, p2]);
        expect(res).toEqual([2, 3, 4]);
      });

      test('many delayed', async () => {
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

        const res = await promiseAll([p0, p1, p2]);
        expect(res).toEqual([1, 2, 3]);
      });
    });

    describe('all reject', () => {
      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(2);
        const p1 = Promise.reject(3);

        await expect(promiseAll([p0, p1])).rejects.toBe(2);
      });

      test('delayed', async () => {
        expect.assertions(1);
        const p0 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(3);
          }, 1);
        });
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        await expect(promiseAll([p0, p1])).rejects.toBe(3);
      });

      test('mixture', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(42);
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        await expect(promiseAll([p0, p1])).rejects.toBe(42);
      });
    });

    describe('mix of resolve and reject', () => {
      test('instant resolve delayed reject', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(42);
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        await expect(promiseAll([p0, p1])).rejects.toBe(2);
      });

      test('instant resolve instant reject', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(42);
        const p1 = Promise.reject(2);

        await expect(promiseAll([p0, p1])).rejects.toBe(2);
      });

      test('instant rejects', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(42);
        const p1 = Promise.reject(43);

        await expect(promiseAll([p0, p1])).rejects.toBe(42);
      });

      test('many promises', async () => {
        expect.assertions(1);
        const p0 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(1);
          }, 200);
        });
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 100);
        });
        const p2 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(3);
          }, 10);
        });

        await expect(promiseAll([p0, p1, p2])).rejects.toBe(3);
      });
    });
  });
});
