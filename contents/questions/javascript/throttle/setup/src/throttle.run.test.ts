import throttle from './throttle';

describe('throttle', () => {
  test('can be initialized', () => {
    const increment = throttle(() => {}, 50);
    expect(increment).toBeInstanceOf(Function);
  });

  test('invokes callback immediately', () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 50);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);
  });

  test('throttles immediate invocations', () => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 50);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);
    increment();
    expect(i).toBe(1);
  });

  test('throttles delayed invocations', (done) => {
    let i = 0;
    const increment = throttle(() => {
      i++;
    }, 100);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(1);

    setTimeout(() => {
      increment();
      expect(i).toBe(1);
    }, 25);

    setTimeout(() => {
      increment();
      expect(i).toBe(1);
      done();
    }, 50);
  });
});
