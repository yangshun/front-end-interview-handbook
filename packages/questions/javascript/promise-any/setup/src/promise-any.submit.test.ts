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

  describe('one promise', () => {
    describe('resolve', () => {
      test('value', async () => {
        expect.assertions(1);
        const p0 = 2;

        const res = await promiseAny([p0]);
        expect(res).toEqual(2);
      });

      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);

        const res = await promiseAny([p0]);
        expect(res).toEqual(2);
      });

      test('delayed', async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 10);
        });

        const res = await promiseAny([p0]);
        expect(res).toEqual(2);
      });
    });

    describe('reject', () => {
      test('instant', async () => {
        expect.assertions(2);
        const p0 = Promise.reject(2);

        try {
          await promiseAny([p0]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([2]);
        }
      });

      test('delayed', async () => {
        expect.assertions(2);
        const p0 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        try {
          await promiseAny([p0]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([2]);
        }
      });
    });
  });

  describe('multiple promises', () => {
    describe('all resolve', () => {
      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);
        const p1 = Promise.resolve(3);

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(2);
      });

      test('delayed', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);
        const p1 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(3);
          }, 10);
        });

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(2);
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

        const res = await promiseAny([p0, p1, p2]);
        expect(res).toEqual(3);
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

        const res = await promiseAny([p0, p1, p2]);
        expect(res).toEqual(3);
      });
    });

    describe('all reject', () => {
      test('instant', async () => {
        expect.assertions(2);
        const p0 = Promise.reject(2);
        const p1 = Promise.reject(3);

        try {
          await promiseAny([p0, p1]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([2, 3]);
        }
      });

      test('delayed', async () => {
        expect.assertions(2);
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

        try {
          await promiseAny([p0, p1]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([3, 2]);
        }
      });

      test('mixture', async () => {
        expect.assertions(2);
        const p0 = Promise.reject(42);
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        try {
          await promiseAny([p0, p1]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([42, 2]);
        }
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

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(42);
      });

      test('instant resolve instant reject', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(42);
        const p1 = Promise.reject(2);

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(42);
      });

      test('instant reject instant resolve', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(42);
        const p1 = Promise.resolve(2);

        const res = await promiseAny([p0, p1]);
        expect(res).toEqual(2);
      });

      test('instant rejects', async () => {
        expect.assertions(2);
        const p0 = Promise.reject(42);
        const p1 = Promise.reject(43);

        try {
          await promiseAny([p0, p1]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([42, 43]);
        }
      });

      test('delayed resolve', async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(1);
          }, 100);
        });
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });
        const p2 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(3);
          }, 200);
        });

        await expect(promiseAny([p0, p1, p2])).resolves.toBe(1);
      });

      test('delayed reject', async () => {
        expect.assertions(2);
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

        try {
          await promiseAny([p0, p1, p2]);
        } catch (err: any) {
          expect(err).toBeInstanceOf(AggregateError);
          expect(err.errors).toEqual([1, 2, 3]);
        }
      });
    });
  });
});
