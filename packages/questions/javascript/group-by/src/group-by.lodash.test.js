import { groupBy } from 'lodash';

describe('groupBy', () => {
  test('groups elements of array by length', () => {
    expect(groupBy(['one', 'two', 'three'], 'length')).toEqual({
      3: ['one', 'two'],
      5: ['three'],
    });
  });

  test('groups elements of array of objects by a property', () => {
    const users = [
      { user: 'barney', age: 36 },
      { user: 'fred', age: 40 },
      { user: 'pebbles', age: 1 },
    ];

    expect(groupBy(users, 'age')).toEqual({
      36: [{ user: 'barney', age: 36 }],
      40: [{ user: 'fred', age: 40 }],
      1: [{ user: 'pebbles', age: 1 }],
    });
  });

  test('does not mutate the original array', () => {
    const arr = ['one', 'two', 'three'];
    const copy = [...arr];
    groupBy(arr, 'length');
    expect(arr).toEqual(copy);
  });

  test('returns a new object', () => {
    const arr = ['one', 'two', 'three'];
    const result = groupBy(arr, 'length');
    expect(result).not.toBe(arr);
  });

  test('handles empty arrays', () => {
    expect(groupBy([], 'length')).toEqual({});
  });

  test('handles single-element arrays', () => {
    expect(groupBy(['one'], 'length')).toEqual({ 3: ['one'] });
  });

  test('handles two-element arrays', () => {
    expect(groupBy(['one', 'two'], 'length')).toEqual({ 3: ['one', 'two'] });
  });

  test('groups elements of array using a function as iteratee', () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
      4: [4.2],
      6: [6.1, 6.3],
    });
  });
});
