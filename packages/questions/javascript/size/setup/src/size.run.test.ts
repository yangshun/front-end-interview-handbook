import size from './size';

describe('size', () => {
  test('null', () => {
    expect(size(null)).toBe(0);
  });

  test('arrays', () => {
    expect(size([])).toBe(0);
    expect(size([1])).toBe(1);
  });

  test('objects', () => {
    expect(size({})).toBe(0);
    expect(size({ a: 1 })).toBe(1);
    expect(size({ a: 1, b: 2 })).toBe(2);
  });
});
