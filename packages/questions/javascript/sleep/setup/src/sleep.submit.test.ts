import sleep from './sleep';

describe('sleep', () => {
  test('returns a promise', () => {
    const sleepPromise = sleep(1);
    expect(sleepPromise instanceof Promise).toBe(true);
  });

  describe('executes after delay', () => {
    test('with await', async () => {
      expect.assertions(4);
      let i = 0;
      expect(i).toBe(0);
      let now = Date.now();
      await sleep(50);
      expect(i).toBe(0);
      i++;
      expect(i).toBe(1);
      expect(Date.now() - now).toBeGreaterThan(25);
    });

    test('delay of 0', (done) => {
      expect.assertions(3);
      let i = 0;
      expect(i).toBe(0);
      sleep(0).then(() => {
        i++;
        expect(i).toBe(2);
        done();
      });
      i++;
      expect(i).toBe(1);
    });

    test('delay bigger than 0', (done) => {
      expect.assertions(3);
      let i = 0;
      expect(i).toBe(0);
      sleep(50).then(() => {
        i++;
        expect(i).toBe(2);
        done();
      });
      i++;
      expect(i).toBe(1);
    });

    test('does not block other async operations', (done) => {
      expect.assertions(4);
      let i = 0;
      expect(i).toBe(0);
      sleep(50).then(() => {
        i++;
        expect(i).toBe(3);
        done();
      });
      setTimeout(() => {
        i++;
        expect(i).toBe(2);
      }, 25);
      i++;
      expect(i).toBe(1);
    });
  });
});
