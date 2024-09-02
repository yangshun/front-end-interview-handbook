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
    expect(q.dequeue()).toBe(200);
  });
});
