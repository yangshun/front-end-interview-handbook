import setCancellableInterval from './cancellable-interval';

describe('setCancellableInterval', () => {
  test('returns a function', () => {
    expect(typeof setCancellableInterval(() => {})).toBe('function');
  });

  test('cancelled immediately', (done) => {
    expect.assertions(2);
    let i = 0;

    setInterval(() => {
      // Ensure setInterval callback is never called.
      expect(i).toBe(0);
      done();
    });
    const cancel = setCancellableInterval(() => {
      i++;
    }, 10);
    cancel();
    expect(i).toBe(0);
  });

  test('after running once', (done) => {
    let i = 0;

    const cancel = setCancellableInterval(() => {
      i++;
    }, 10);

    setTimeout(() => {
      expect(i).toBe(1);
      cancel();
      done();
    }, 15);

    expect(i).toBe(0);
  });
});
