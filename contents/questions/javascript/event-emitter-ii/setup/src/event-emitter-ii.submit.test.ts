import EventEmitter from './event-emitter-ii';

describe('EventEmitter', () => {
  test('constructor', () => {
    const emitter = new EventEmitter();
    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  describe('subscribe', () => {
    test('returns object with off() method', () => {
      const emitter = new EventEmitter();
      const sub = emitter.on('foo', () => {});

      expect(sub).toBeTruthy();
      expect(sub.off).toBeTruthy();
    });

    test('single listener', () => {
      const emitter = new EventEmitter();
      let a = 0;
      emitter.on('foo', () => {
        a = 1;
      });
      emitter.emit('foo');

      expect(a).toBe(1);
    });

    test('multiple listeners', () => {
      const emitter = new EventEmitter();
      let a = 0,
        b = 1;
      emitter.on('foo', () => {
        a = 1;
      });
      emitter.on('foo', () => {
        b = 3;
      });
      emitter.emit('foo');

      expect(a).toBe(1);
      expect(b).toBe(3);
    });

    test('multiple events', () => {
      const emitter = new EventEmitter();
      let a = 0,
        b = 1;
      emitter.on('foo', () => {
        a = 1;
      });
      emitter.on('bar', () => {
        b = 3;
      });
      emitter.emit('foo');
      expect(a).toBe(1);
      expect(b).toBe(1);

      emitter.emit('bar');
      expect(b).toBe(3);
    });

    test('same listener added multiple times', () => {
      const emitter = new EventEmitter();

      let num = 1;
      function square() {
        num *= 2;
      }

      emitter.on('square', square);
      emitter.emit('square');
      expect(num).toBe(2);

      emitter.on('square', square);
      emitter.emit('square');
      expect(num).toBe(8);
    });
  });

  describe('emit', () => {
    describe('listeners are invoked with arguments', () => {
      test('single argument', () => {
        const emitter = new EventEmitter();

        let sum = 0;
        emitter.on('foo', (a: number) => {
          sum = a;
        });
        emitter.emit('foo', 3);
        expect(sum).toBe(3);

        emitter.emit('foo', 5);
        expect(sum).toBe(5);
      });

      test('two arguments', () => {
        const emitter = new EventEmitter();

        let sum = 0;
        emitter.on('foo', (a: number, b: number) => {
          sum = a + b;
        });
        emitter.emit('foo', 3, 5);
        expect(sum).toBe(8);

        emitter.emit('foo', 4, 13);
        expect(sum).toBe(17);
      });

      test('multiple arguments', () => {
        const emitter = new EventEmitter();

        let product = 0;
        emitter.on('foo', (a: number, b: number, c: number) => {
          product = a * b * c;
        });
        emitter.emit('foo', 3, 5, 6);
        expect(product).toBe(90);

        emitter.emit('foo', 4, 13, 9);
        expect(product).toBe(468);
      });
    });

    describe('non-existing event name returns false', () => {
      test('custom event', () => {
        const emitter = new EventEmitter();

        expect(emitter.emit('foo')).toBe(false);
      });

      test('same name as built-in event', () => {
        const emitter = new EventEmitter();

        expect(emitter.emit('toString')).toBe(false);
      });
    });
  });

  describe('unsubscribe', () => {
    test('single listener', () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      const sub = emitter.on('foo', addTwoNumbers);
      emitter.emit('foo', 2, 5);
      expect(sum).toBe(7);

      sub.off();
      emitter.emit('foo', -3, 9);
      expect(sum).toBe(7);
    });

    test('multiple listeners', () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      const addSub = emitter.on('foo', addTwoNumbers);
      emitter.emit('foo', 2, 5);
      expect(sum).toBe(7);

      let product = 0;
      function multiplyTwoNumbers(a: number, b: number) {
        product = a * b;
      }
      const mulSub = emitter.on('foo', multiplyTwoNumbers);
      emitter.emit('foo', 4, 5);
      expect(sum).toBe(9);
      expect(product).toBe(20);

      addSub.off();
      emitter.emit('foo', -3, 9);
      expect(sum).toBe(9);
      expect(product).toBe(-27);

      mulSub.off();
      emitter.emit('foo', 3, 7);
      expect(sum).toBe(9);
      expect(product).toBe(-27);
    });

    test('multiple events', () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      const fooSub = emitter.on('foo', addTwoNumbers);
      emitter.emit('foo', 2, 5);
      expect(sum).toBe(7);

      const barSub = emitter.on('bar', addTwoNumbers);
      emitter.emit('bar', 3, 7);
      expect(sum).toBe(10);

      fooSub.off();
      emitter.emit('foo', -3, 9);
      expect(sum).toBe(10);

      barSub.off();
      emitter.emit('bar', -3, 9);
      expect(sum).toBe(10);
    });

    test('same listener added multiple times removed correctly', () => {
      const emitter = new EventEmitter();

      let num = 1;
      function square() {
        num *= 2;
      }

      const sub1 = emitter.on('square', square);
      emitter.emit('square');
      expect(num).toBe(2);

      const sub2 = emitter.on('square', square);
      emitter.emit('square');
      expect(num).toBe(8);

      sub1.off();
      emitter.emit('square');
      expect(num).toBe(16);

      sub2.off();
      emitter.emit('square');
      expect(num).toBe(16);
    });

    test("sub.off() called more than once doesn't crash", () => {
      const emitter = new EventEmitter();

      let sum = 0;
      function addTwoNumbers(a: number, b: number) {
        sum = a + b;
      }
      const sub = emitter.on('foo', addTwoNumbers);
      emitter.emit('foo', 2, 5);
      expect(sum).toBe(7);

      sub.off();
      emitter.emit('foo', -3, 9);
      expect(sum).toBe(7);

      sub.off();
      emitter.emit('foo', -3, 9);
      expect(sum).toBe(7);
    });
  });
});
