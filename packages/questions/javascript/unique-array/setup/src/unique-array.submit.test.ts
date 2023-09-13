import uniqueArray from './unique-array';

describe('uniqueArray', () => {
  test('empty array', () => {
    expect(uniqueArray([])).toEqual([]);
  });

  test('one value', () => {
    expect(uniqueArray([0])).toEqual([0]);
  });

  test('different values', () => {
    expect(uniqueArray([2, 3])).toEqual([2, 3]);
    expect(uniqueArray([0, 1, 2, 3])).toEqual([0, 1, 2, 3]);
  });

  test('duplicate values', () => {
    expect(uniqueArray([2, 1, 2])).toEqual([2, 1]);
    expect(uniqueArray([2, 2, 1])).toEqual([2, 1]);
    expect(uniqueArray([2, 1, 2, 3])).toEqual([2, 1, 3]);
  });

  test('string values', () => {
    expect(uniqueArray(['foo', 'bar', 'foo'])).toEqual(['foo', 'bar']);
    expect(uniqueArray(['foo', 'bar', 'bar', 'foo'])).toEqual(['foo', 'bar']);
    expect(uniqueArray(['1', '2', '2', '3'])).toEqual(['1', '2', '3']);
  });

  test('boolean values', () => {
    expect(uniqueArray([false])).toEqual([false]);
    expect(uniqueArray([false, true])).toEqual([false, true]);
    expect(uniqueArray([true, false, true])).toEqual([true, false]);
    expect(uniqueArray([true, true, false])).toEqual([true, false]);
  });

  test('null-ish values', () => {
    expect(uniqueArray([null])).toEqual([null]);
    expect(uniqueArray([null, null])).toEqual([null]);
    expect(uniqueArray([null, undefined])).toEqual([null, undefined]);
    expect(uniqueArray([null, undefined, null])).toEqual([null, undefined]);
    expect(uniqueArray([null, null, undefined])).toEqual([null, undefined]);
  });

  test('mixed values', () => {
    expect(uniqueArray([2, 1, '2', '1'])).toEqual([2, 1, '2', '1']);
    expect(uniqueArray(['2', 2, 2, 1, 1, '2', '1'])).toEqual(['2', 2, 1, '1']);
    expect(uniqueArray([true, 'true', true])).toEqual([true, 'true']);
  });
});
