import debounce from './debounce';

describe('debounce', () => {
  test('can be initialized', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const increment = debounce(() => {}, 50);

    expect(increment).toBeTruthy();
  });

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
