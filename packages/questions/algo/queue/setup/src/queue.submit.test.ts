import Queue from './queue';

describe('Queue', () => {
  test('constructor', () => {
    const q = new Queue();
    expect(q instanceof Queue);
  });

  test('enqueue()', () => {
    const q = new Queue();
    expect(q.enqueue(100)).toBe(1);
    expect(q.enqueue(200)).toBe(2);
  });

  test('dequeue()', () => {
    const q = new Queue();
    q.enqueue(100);
    q.enqueue(200);
    expect(q.dequeue()).toBe(100);
    expect(q.length()).toBe(1);
    expect(q.dequeue()).toBe(200);
    expect(q.length()).toBe(0);
    expect(q.dequeue()).toBe(undefined);
  });

  test('isEmpty()', () => {
    const q = new Queue();
    expect(q.isEmpty()).toBeTruthy();
    q.enqueue(100);
    expect(q.isEmpty()).toBeFalsy();
    q.dequeue();
    expect(q.isEmpty()).toBeTruthy();
  });

  test('length()', () => {
    const q = new Queue();
    q.enqueue(100);
    expect(q.length()).toBe(1);
    q.enqueue(200);
    expect(q.length()).toBe(2);
    q.dequeue();
    expect(q.length()).toBe(1);
    q.enqueue(300);
    expect(q.length()).toBe(2);
  });

  test('front()', () => {
    const q = new Queue();
    q.enqueue(100);
    expect(q.front()).toBe(100);
    q.enqueue(200);
    expect(q.front()).toBe(100);
    q.dequeue();
    expect(q.front()).toBe(200);
    q.enqueue(300);
    expect(q.front()).toBe(200);
    q.dequeue();
    q.dequeue();
    expect(q.front()).toBe(undefined);
  });

  test('back()', () => {
    const q = new Queue();
    q.enqueue(100);
    expect(q.back()).toBe(100);
    q.enqueue(200);
    expect(q.back()).toBe(200);
    q.dequeue();
    expect(q.back()).toBe(200);
    q.enqueue(300);
    expect(q.back()).toBe(300);
    q.dequeue();
    q.dequeue();
    expect(q.back()).toBe(undefined);
  });

  test('integration', () => {
    const q = new Queue();
    q.enqueue(100);
    expect(q.length()).toBe(1);
    expect(q.dequeue()).toBe(100);
    expect(q.length()).toBe(0);
    q.enqueue(200);
    expect(q.length()).toBe(1);
    expect(q.dequeue()).toBe(200);
  });
});
