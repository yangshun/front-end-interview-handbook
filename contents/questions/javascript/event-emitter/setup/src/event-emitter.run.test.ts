import EventEmitter from './event-emitter';

describe('EventEmitter', () => {
  test('constructor', () => {
    const emitter = new EventEmitter();
    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  test('subscribe', () => {
    const emitter = new EventEmitter();
    let a = 0;
    emitter.on('foo', () => {
      a = 1;
    });
    emitter.emit('foo');

    expect(a).toBe(1);
  });

  test('emit', () => {
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
});
