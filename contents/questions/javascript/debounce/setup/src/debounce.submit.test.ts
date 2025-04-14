import debounce from './debounce';

describe('debounce', () => {
  test('can be initialized', () => {
    const increment = debounce(() => {}, 50);
    expect(increment).toBeTruthy();
  });

  test('executes after duration', (done) => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 10);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(0);

    setTimeout(() => {
      expect(i).toBe(1);
      done();
    }, 20);
  });

  describe('uses arguments', () => {
    test('called once', (done) => {
      let i = 21;
      const increment = debounce((a: number, b: number) => {
        i += a * b;
      }, 10);

      expect(i).toBe(21);
      increment(3, 7);
      expect(i).toBe(21);

      setTimeout(() => {
        expect(i).toBe(42);
        done();
      }, 20);
    });

    test('uses arguments of latest invocation', (done) => {
      let i = 21;
      const increment = debounce((a: number, b: number) => {
        i += a * b;
      }, 10);

      expect(i).toBe(21);
      increment(3, 7);
      increment(4, 5);
      expect(i).toBe(21);

      setTimeout(() => {
        expect(i).toBe(41);
        done();
      }, 20);
    });
  });

  test('execute once even after calling it multiple times', (done) => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 20);

    expect(i).toBe(0);
    increment();
    increment();
    increment();
    increment();
    expect(i).toBe(0);

    // Should not fire yet.
    setTimeout(() => {
      expect(i).toBe(0);
    }, 10);

    setTimeout(() => {
      expect(i).toBe(1);
      done();
    }, 30);
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
    const increment = debounce(function (this: any, delta: number) {
      this.val += delta;
    }, 10);

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
    }, 20);
  });
});
