import countBy from './count-by';

describe('countBy', () => {
  test('empty array', () => {
    expect(countBy([], Math.floor)).toEqual({});
  });

  test('single-element arrays', () => {
    expect(countBy([6.1], Math.floor)).toEqual({ 6: 1 });
  });

  test('two-element arrays', () => {
    expect(countBy([6.1, 4.2], Math.floor)).toEqual({ 4: 1, 6: 1 });
  });
});
