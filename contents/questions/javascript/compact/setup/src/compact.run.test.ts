import compact from './compact';

describe('compact', () => {
  test('empty array', () => {
    expect(compact([])).toEqual([]);
  });

  test('single-element array', () => {
    expect(compact([1])).toEqual([1]);
    expect(compact([null])).toEqual([]);
  });

  test('two-element array', () => {
    expect(compact([1, 2])).toEqual([1, 2]);
    expect(compact([null, 1])).toEqual([1]);
    expect(compact([1, null])).toEqual([1]);
    expect(compact([false, null])).toEqual([]);
  });
});
