import fill from './fill';

describe('fill', () => {
  test('empty array', () => {
    expect(fill([], '*')).toEqual([]);
  });

  test('single element', () => {
    expect(fill([1], '*')).toEqual(['*']);
    expect(fill([1], '*', 0, 1)).toEqual(['*']);
    expect(fill([1], '*', 2, 3)).toEqual([1]);
  });

  test('two elements', () => {
    expect(fill([1, 2], '*')).toEqual(['*', '*']);
    expect(fill([1, 2], '*', 1)).toEqual([1, '*']);
    expect(fill([1, 2], '*', 2, 3)).toEqual([1, 2]);
  });
});
