import Stack from './stack';

describe('Stack', () => {
  test('constructor', () => {
    const s = new Stack();
    expect(s instanceof Stack);
  });

  test('push()', () => {
    const s = new Stack();
    expect(s.push(100)).toBe(1);
    expect(s.push(200)).toBe(2);
  });

  test('pop()', () => {
    const s = new Stack();
    s.push(100);
    s.push(200);
    expect(s.pop()).toBe(200);
    expect(s.pop()).toBe(100);
  });
});
