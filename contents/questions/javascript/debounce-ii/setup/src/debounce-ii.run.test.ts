import debounce from './debounce-ii';

describe('debounce', () => {
  test('can be initialized', () => {
    const increment = debounce(() => 1, 50);

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

  test('immediately cancel', (done) => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 10);

    expect(i).toBe(0);
    increment();
    increment();
    expect(i).toBe(0);
    increment.cancel();

    setTimeout(() => {
      expect(i).toBe(0);
      done();
      // Add a longer delay because the browser timer is unreliable.
    }, 20);
  });

  test('immediately flush', (done) => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 10);

    expect(i).toBe(0);
    increment();
    increment.flush();
    expect(i).toBe(1);

    setTimeout(() => {
      expect(i).toBe(1);
      done();
      // Add a longer delay because the browser timer is unreliable.
    }, 100);
  });
});
