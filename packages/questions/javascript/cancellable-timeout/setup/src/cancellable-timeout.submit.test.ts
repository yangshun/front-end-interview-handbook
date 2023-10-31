import setCancellableTimeout from './cancellable-timeout';

describe('setCancellableTimeout', () => {
  test('returns a function', () => {
    expect(typeof setCancellableTimeout(() => {})).toBe('function');
  });

  describe('cancelled', () => {
    test('immediately', (done) => {
      expect.assertions(2);
      let i = 0;

      setTimeout(() => {
        // Ensure setTimeout callback is never called.
        expect(i).toBe(0);
        done();
      });
      const cancel = setCancellableTimeout(() => {
        i++;
      }, 10);
      cancel();
      expect(i).toBe(0);
    });

    test('delayed', (done) => {
      expect.assertions(2);
      let i = 0;

      setTimeout(() => {
        // Ensure setTimeout callback is never called.
        expect(i).toBe(0);
        done();
      }, 20);
      const cancel = setCancellableTimeout(() => {
        i++;
      }, 10);
      cancel();
      expect(i).toBe(0);
    });
  });

  describe('not cancelled', () => {
    test('immediately', (done) => {
      expect.assertions(2);
      let i = 0;

      setCancellableTimeout(() => {
        i++;
        expect(i).toBe(1);
        done();
      });

      expect(i).toBe(0);
    });

    test('delayed', (done) => {
      expect.assertions(2);
      let i = 0;

      setCancellableTimeout(() => {
        i++;
        expect(i).toBe(1);
        done();
      }, 100);

      expect(i).toBe(0);
    });

    test('uses parameters', (done) => {
      expect.assertions(2);
      let i = 1;

      setCancellableTimeout(
        (foo: number, bar: number) => {
          i += foo;
          i *= bar;
          expect(i).toBe(21);
          done();
        },
        10,
        2,
        7,
      );

      expect(i).toBe(1);
    });

    test('cancelling afterwards is safe', (done) => {
      expect.assertions(3);
      let i = 1;

      const cancel = setCancellableTimeout(
        (foo: number, bar: number) => {
          i += foo;
          i *= bar;
          expect(i).toBe(21);
        },
        10,
        2,
        7,
      );

      setTimeout(() => {
        cancel();
        expect(i).toBe(21);
        done();
      }, 50);

      expect(i).toBe(1);
    });
  });

  test('callbacks can access `this`', (done) => {
    expect.assertions(2);

    function increment(this: any, delta: number) {
      this.val += delta;
    }

    const obj = {
      val: 13,
    };

    setCancellableTimeout(increment.bind(obj), 10, 15);

    expect(obj.val).toBe(13);

    setTimeout(() => {
      expect(obj.val).toBe(28);
      done();
    }, 20);
  });
});
