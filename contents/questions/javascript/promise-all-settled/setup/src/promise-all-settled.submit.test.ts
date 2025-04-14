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

  describe('one promise', () => {
    describe('resolve', () => {
      test('value', async () => {
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

      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);

        const res = await promiseAllSettled([p0]);
        expect(res).toEqual([
          {
            status: 'fulfilled',
            value: 2,
          },
        ]);
      });

      test('delayed', async () => {
        expect.assertions(1);
        const p0 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(2);
          }, 10);
        });

        const res = await promiseAllSettled([p0]);
        expect(res).toEqual([
          {
            status: 'fulfilled',
            value: 2,
          },
        ]);
      });
    });

    describe('reject', () => {
      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(2);

        const res = await promiseAllSettled([p0]);
        expect(res).toEqual([
          {
            status: 'rejected',
            reason: 2,
          },
        ]);
      });

      test('delayed', async () => {
        expect.assertions(1);
        const p0 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        const res = await promiseAllSettled([p0]);
        expect(res).toEqual([
          {
            status: 'rejected',
            reason: 2,
          },
        ]);
      });
    });
  });

  describe('multiple promises', () => {
    describe('all resolve', () => {
      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);
        const p1 = Promise.resolve(3);

        const res = await promiseAllSettled([p0, p1]);
        expect(res).toEqual([
          {
            status: 'fulfilled',
            value: 2,
          },
          {
            status: 'fulfilled',
            value: 3,
          },
        ]);
      });

      test('delayed', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(2);
        const p1 = new Promise((resolve) => {
          setTimeout(() => {
            resolve(3);
          }, 10);
        });

        const res = await promiseAllSettled([p0, p1]);
        expect(res).toEqual([
          {
            status: 'fulfilled',
            value: 2,
          },
          {
            status: 'fulfilled',
            value: 3,
          },
        ]);
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

        const res = await promiseAllSettled([p0, p1, p2]);
        expect(res).toEqual([
          {
            status: 'fulfilled',
            value: 2,
          },
          {
            status: 'fulfilled',
            value: 3,
          },
          {
            status: 'fulfilled',
            value: 4,
          },
        ]);
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

        const res = await promiseAllSettled([p0, p1, p2]);
        expect(res).toEqual([
          {
            status: 'fulfilled',
            value: 1,
          },
          {
            status: 'fulfilled',
            value: 2,
          },
          {
            status: 'fulfilled',
            value: 3,
          },
        ]);
      });
    });

    describe('all reject', () => {
      test('instant', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(2);
        const p1 = Promise.reject(3);

        const res = await promiseAllSettled([p0, p1]);
        expect(res).toEqual([
          {
            status: 'rejected',
            reason: 2,
          },
          {
            status: 'rejected',
            reason: 3,
          },
        ]);
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

        const res = await promiseAllSettled([p0, p1]);
        expect(res).toEqual([
          {
            status: 'rejected',
            reason: 3,
          },
          {
            status: 'rejected',
            reason: 2,
          },
        ]);
      });

      test('mixture', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(42);
        const p1 = new Promise((_, reject) => {
          setTimeout(() => {
            reject(2);
          }, 10);
        });

        const res = await promiseAllSettled([p0, p1]);
        expect(res).toEqual([
          {
            status: 'rejected',
            reason: 42,
          },
          {
            status: 'rejected',
            reason: 2,
          },
        ]);
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

      test('instant resolve instant reject', async () => {
        expect.assertions(1);
        const p0 = Promise.resolve(42);
        const p1 = Promise.reject(2);

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

      test('instant rejects', async () => {
        expect.assertions(1);
        const p0 = Promise.reject(42);
        const p1 = Promise.reject(43);

        const res = await promiseAllSettled([p0, p1]);
        expect(res).toEqual([
          {
            status: 'rejected',
            reason: 42,
          },
          {
            status: 'rejected',
            reason: 43,
          },
        ]);
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

        const res = await promiseAllSettled([p0, p1, p2]);
        expect(res).toEqual([
          {
            status: 'rejected',
            reason: 1,
          },
          {
            status: 'rejected',
            reason: 2,
          },
          {
            status: 'rejected',
            reason: 3,
          },
        ]);
      });
    });
  });
});
