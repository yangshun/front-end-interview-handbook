import createResumableInterval from './resumable-interval';

describe('createResumableInterval', () => {
  test('returns an object with the necessary methods', () => {
    const interval = createResumableInterval(() => {});
    expect(typeof interval).toBe('object');
    expect(interval.start).toBeTruthy();
    expect(interval.pause).toBeTruthy();
    expect(interval.stop).toBeTruthy();
  });

  test('start', (done) => {
    expect.assertions(3);
    let i = 0;
    const { start } = createResumableInterval(() => {
      i++;
    }, 10);
    expect(i).toBe(0);
    start();
    expect(i).toBe(1);
    setTimeout(() => {
      expect(i).toBeGreaterThan(1);
      done();
    }, 20);
  });

  test('can resume', (done) => {
    expect.assertions(5);
    let i = 0;
    const { start, pause, stop } = createResumableInterval(() => {
      i++;
    }, 10);
    expect(i).toBe(0);
    start();
    expect(i).toBe(1);
    pause();
    expect(i).toBe(1);
    start();
    expect(i).toBe(2);
    setTimeout(() => {
      expect(i).toBe(3);
      stop?.();
      done();
    }, 15);
  });
});
