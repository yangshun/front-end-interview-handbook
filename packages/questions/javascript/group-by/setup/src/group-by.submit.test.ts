import groupBy from './group-by';

describe('groupBy', () => {
  test('empty array', () => {
    expect(groupBy([], (o: any) => o)).toEqual({});
  });

  describe('function iteratees', () => {
    test('single-element arrays', () => {
      expect(groupBy([6.1], Math.floor)).toEqual({ 6: [6.1] });
    });

    test('two-element arrays', () => {
      expect(groupBy([6.1, 4.2], Math.floor)).toEqual({ 4: [4.2], 6: [6.1] });
    });

    test('multiple element arrays', () => {
      expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
        4: [4.2],
        6: [6.1, 6.3],
      });
    });

    test('keys that are also properties', () => {
      expect(groupBy(['one', 'two', 'three'], () => 'length')).toEqual({
        length: ['one', 'two', 'three'],
      });
    });
  });

  describe('property iteratees', () => {
    test('single-element arrays', () => {
      expect(groupBy(['one'], (o: string) => o.length)).toEqual({ 3: ['one'] });
    });

    test('two-element arrays', () => {
      expect(groupBy(['one', 'two'], (o: string) => o.length)).toEqual({
        3: ['one', 'two'],
      });
    });

    test('multiple element arrays', () => {
      expect(groupBy(['one', 'two', 'three'], (o: string) => o.length)).toEqual(
        {
          3: ['one', 'two'],
          5: ['three'],
        },
      );
    });

    test('groups elements of array of objects by a property', () => {
      const users = [
        { user: 'barney', age: 36 },
        { user: 'fred', age: 40 },
        { user: 'pebbles', age: 1 },
      ];

      expect(groupBy(users, (o: any) => o.age)).toEqual({
        36: [{ user: 'barney', age: 36 }],
        40: [{ user: 'fred', age: 40 }],
        1: [{ user: 'pebbles', age: 1 }],
      });
    });
  });

  test('does not mutate the original array', () => {
    const arr = ['one', 'two', 'three'];
    const copy = arr.slice();
    groupBy(arr, (o: string) => o.length);
    expect(arr).toEqual(copy);
  });

  test('false values', () => {
    expect(groupBy([{ n: 1 }, { n: 2 }], (o: any) => o.m)).toEqual({
      undefined: [{ n: 1 }, { n: 2 }],
    });
  });
});
