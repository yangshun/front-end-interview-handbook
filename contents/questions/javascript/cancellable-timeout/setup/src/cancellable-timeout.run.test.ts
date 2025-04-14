import setCancellableTimeout from './cancellable-timeout';

describe('setCancellableTimeout', () => {
  test('returns a function', () => {
    expect(typeof setCancellableTimeout(() => {})).toBe('function');
  });

  test('cancelled immediately', (done) => {
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

  test('not cancelled', (done) => {
    expect.assertions(2);
    let i = 0;

    setCancellableTimeout(() => {
      i++;
      expect(i).toBe(1);
      done();
    }, 100);

    expect(i).toBe(0);
  });
});
