import createResumableInterval from './resumable-interval';

describe('createResumableInterval', () => {
  test('returns an object with the necessary methods', () => {
    const interval = createResumableInterval(() => {});
    expect(typeof interval).toBe('object');
    expect(interval.start).toBeTruthy();
    expect(interval.pause).toBeTruthy();
    expect(interval.stop).toBeTruthy();
  });

  test('paused by default', (done) => {
    expect.assertions(2);
    let i = 0;
    createResumableInterval(() => {
      i++;
    }, 10);
    expect(i).toBe(0);
    setTimeout(() => {
      expect(i).toBe(0);
      done();
    }, 20);
  });

  describe('start', () => {
    test('callback is executed immediately after starting', (done) => {
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

    test('callback runs at intervals', (done) => {
      let i = 0;
      const { start, stop } = createResumableInterval(() => {
        i++;
        if (i === 3) {
          stop?.();
          done();
        }
      }, 10);
      expect(i).toBe(0);
      start();
      expect(i).toBe(1);
    });

    test('calling start() multiple times does not execute callback each time', (done) => {
      let i = 0;
      const { start } = createResumableInterval(() => {
        i++;
      }, 10);
      expect(i).toBe(0);
      start();
      expect(i).toBe(1);
      start();
      expect(i).toBe(1);
      done();
    });
  });

  describe('pause', () => {
    describe('can be paused', () => {
      test('immediately', (done) => {
        expect.assertions(3);
        let i = 0;
        const { start, pause } = createResumableInterval(() => {
          i++;
        }, 10);
        expect(i).toBe(0);
        start();
        expect(i).toBe(1);
        pause();
        setTimeout(() => {
          expect(i).toBe(1);
          done();
        }, 20);
      });

      test('after first execution', (done) => {
        expect.assertions(4);
        let i = 0;
        const { start, pause } = createResumableInterval(() => {
          i++;
        }, 10);
        expect(i).toBe(0);
        start();
        expect(i).toBe(1);
        setTimeout(() => {
          pause();
          expect(i).toBe(2);
        }, 15);
        setTimeout(() => {
          expect(i).toBe(2);
          done();
        }, 25);
      });
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

    test('can pause multiple times', (done) => {
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
      pause();
      expect(i).toBe(1);
      setTimeout(() => {
        expect(i).toBe(1);
        stop?.();
        done();
      }, 15);
    });

    test('can resume after pausing multiple times', (done) => {
      expect.assertions(7);
      let i = 0;
      const { start, pause, stop } = createResumableInterval(() => {
        i++;
      }, 10);
      expect(i).toBe(0);
      start();
      expect(i).toBe(1);
      pause();
      expect(i).toBe(1);
      pause();
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

  describe('stop', () => {
    describe('can be stopped', () => {
      test('immediately', (done) => {
        expect.assertions(3);
        let i = 0;
        const { start, stop } = createResumableInterval(() => {
          i++;
        }, 10);
        expect(i).toBe(0);
        start();
        expect(i).toBe(1);
        stop();
        setTimeout(() => {
          expect(i).toBe(1);
          done();
        }, 15);
      });

      test('after first execution', (done) => {
        expect.assertions(4);
        let i = 0;
        const { start, stop } = createResumableInterval(() => {
          i++;
        }, 10);
        expect(i).toBe(0);
        start();
        expect(i).toBe(1);
        setTimeout(() => {
          stop();
          expect(i).toBe(2);
        }, 15);
        setTimeout(() => {
          expect(i).toBe(2);
          done();
        }, 25);
      });
    });

    describe('cannot be resumed', () => {
      test('stopped immediately', (done) => {
        expect.assertions(4);
        let i = 0;
        const { start, stop } = createResumableInterval(() => {
          i++;
        }, 10);
        expect(i).toBe(0);
        start();
        expect(i).toBe(1);
        stop();
        start();
        setTimeout(() => {
          expect(i).toBe(1);
        }, 15);
        setTimeout(() => {
          expect(i).toBe(1);
          done();
        }, 25);
      });

      test('stopped after first execution', (done) => {
        expect.assertions(4);
        let i = 0;
        const { start, stop } = createResumableInterval(() => {
          i++;
        }, 10);
        expect(i).toBe(0);
        start();
        expect(i).toBe(1);
        setTimeout(() => {
          stop();
          expect(i).toBe(2);
          start();
        }, 15);
        setTimeout(() => {
          expect(i).toBe(2);
          done();
        }, 30);
      });
    });
  });

  // TODO: Disabled for now.
  // test('integration', (done) => {
  //   expect.assertions(10);
  //   let i = 0;
  //   const { start, pause, stop } = createResumableInterval(() => {
  //     i++;
  //   }, 10);
  //   expect(i).toBe(0);
  //   start();
  //   expect(i).toBe(1);
  //   pause();
  //   pause();
  //   expect(i).toBe(1);
  //   start();
  //   expect(i).toBe(2);
  //   setTimeout(() => {
  //     pause();
  //     expect(i).toBe(3);
  //   }, 15);
  //   setTimeout(() => {
  //     expect(i).toBe(3);
  //     start();
  //     expect(i).toBe(4);
  //   }, 30);
  //   setTimeout(() => {
  //     expect(i).toBe(5);
  //     stop();
  //   }, 45);
  //   setTimeout(() => {
  //     expect(i).toBe(5);
  //     start();
  //     pause();
  //   }, 60);
  //   setTimeout(() => {
  //     expect(i).toBe(5);
  //     done();
  //   }, 100);
  // });
});
