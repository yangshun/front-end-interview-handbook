import debounce from './debounce-ii';

/* eslint-disable no-undef */
describe('debounce', () => {
  test('can be initialized', () => {
    const increment = debounce(() => 1, 50);

    expect(increment).toBeTruthy();
  });

  describe('basic functionality', () => {
    test('executes after duration', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 50);

      expect(i).toBe(0);
      increment();
      expect(i).toBe(0);

      setTimeout(() => {
        expect(i).toBe(1);
        done();
      }, 100);
    });

    test('uses arguments', (done) => {
      let i = 21;
      const increment = debounce((a, b) => {
        i += a * b;
      }, 50);

      expect(i).toBe(21);
      increment(3, 7);
      expect(i).toBe(21);

      setTimeout(() => {
        expect(i).toBe(42);
        done();
      }, 100);
    });

    test('execute once even after calling it multiple times', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 50);

      expect(i).toBe(0);
      increment();
      increment();
      increment();
      increment();
      expect(i).toBe(0);

      // Should not fire yet.
      setTimeout(() => {
        expect(i).toBe(0);
      }, 25);

      setTimeout(() => {
        expect(i).toBe(1);
        done();
      }, 75);
    });

    test('duration extended if called again during window', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 100);

      expect(i).toBe(0);
      increment();
      increment();
      expect(i).toBe(0);

      // Should not fire yet.
      setTimeout(() => {
        expect(i).toBe(0);
        increment();
        expect(i).toBe(0);
      }, 50);

      setTimeout(() => {
        // Still 0 because we fired again at t=50, increment will only happen at t=150
        expect(i).toBe(0);
      }, 125);

      setTimeout(() => {
        expect(i).toBe(1);
        done();
        // Add a longer delay because the browser timer is unreliable.
      }, 1500);
    });

    test('callbacks can access `this`', (done) => {
      const increment = debounce(function (delta) {
        this.val += delta;
      }, 50);

      const obj = {
        val: 2,
        increment,
      };

      expect(obj.val).toBe(2);
      obj.increment(3);
      expect(obj.val).toBe(2);

      setTimeout(() => {
        expect(obj.val).toBe(5);
        done();
      }, 100);
    });
  });

  describe('cancel', () => {
    test('immediately cancel', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 100);

      expect(i).toBe(0);
      increment();
      increment();
      expect(i).toBe(0);
      increment.cancel();

      setTimeout(() => {
        expect(i).toBe(0);
        done();
        // Add a longer delay because the browser timer is unreliable.
      }, 1500);
    });

    test('cancel after a while', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 200);

      expect(i).toBe(0);
      increment();
      expect(i).toBe(0);

      setTimeout(() => {
        expect(i).toBe(0);
        increment.cancel();
        expect(i).toBe(0);
      }, 50);

      setTimeout(() => {
        expect(i).toBe(0);
        done();
        // Add a longer delay because the browser timer is unreliable.
      }, 500);
    });

    test('cancel after callback has fired should not crash', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 100);

      expect(i).toBe(0);
      increment();
      increment();
      expect(i).toBe(0);

      setTimeout(() => {
        expect(i).toBe(1);
        increment.cancel();
        expect(i).toBe(1);
        done();
        // Add a longer delay because the browser timer is unreliable.
      }, 500);
    });
  });

  describe('flush', () => {
    test('immediately flush', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 100);

      expect(i).toBe(0);
      increment();
      increment.flush();
      expect(i).toBe(1);

      setTimeout(() => {
        expect(i).toBe(1);
        done();
        // Add a longer delay because the browser timer is unreliable.
      }, 500);
    });

    test('flush after a while', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 200);

      expect(i).toBe(0);
      increment();
      expect(i).toBe(0);

      setTimeout(() => {
        expect(i).toBe(0);
        increment.flush();
        expect(i).toBe(1);
      }, 50);

      setTimeout(() => {
        expect(i).toBe(1);
        done();
        // Add a longer delay because the browser timer is unreliable.
      }, 500);
    });

    test('flush after callback has fired should not execute', (done) => {
      let i = 0;
      const increment = debounce(() => {
        i++;
      }, 200);

      expect(i).toBe(0);
      increment();
      expect(i).toBe(0);

      setTimeout(() => {
        expect(i).toBe(1);
      }, 300);

      setTimeout(() => {
        expect(i).toBe(1);
        increment.flush();
        expect(i).toBe(1);
        done();
        // Add a longer delay because the browser timer is unreliable.
      }, 500);
    });

    describe('flush should not be invoked without any delayed callbacks', (done) => {
      test('invoked after delay', () => {
        let i = 0;
        const increment = debounce(() => {
          i++;
        }, 100);

        expect(i).toBe(0);
        increment();
        expect(i).toBe(0);

        setTimeout(() => {
          expect(i).toBe(1);
          increment.flush();
          expect(i).toBe(0);
          done();
          // Add a longer delay because the browser timer is unreliable.
        }, 500);
      });

      test('already flushed', () => {
        let i = 0;
        const increment = debounce(() => {
          i++;
        }, 100);

        expect(i).toBe(0);
        increment.flush();
        expect(i).toBe(0);

        setTimeout(() => {
          increment.flush();
          expect(i).toBe(0);
          done();
          // Add a longer delay because the browser timer is unreliable.
        }, 500);
      });

      test('already cancelled', (done) => {
        let i = 0;
        const increment = debounce(() => {
          i++;
        }, 500);

        expect(i).toBe(0);
        increment();
        increment.cancel();
        expect(i).toBe(0);

        setTimeout(() => {
          increment.flush();
          expect(i).toBe(0);
          done();
        }, 200);
      });
    });
  });
});
