import EventEmitter from './event-emitter-ii';

describe('EventEmitter', () => {
  test('constructor', () => {
    const emitter = new EventEmitter();
    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  test('emit', () => {
    const emitter = new EventEmitter();
    let a = 0;
    emitter.on('foo', () => {
      a = 1;
    });
    emitter.emit('foo');

    expect(a).toBe(1);
  });

  test('unsubscribe', () => {
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
});
