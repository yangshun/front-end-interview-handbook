import { without as withoutLodash } from 'lodash';
import withoutGFE from './without';
import withoutFilter from './without-filter';
import withoutSet from './without-filter-set';

describe('without', () => {
  [withoutLodash, withoutGFE, withoutFilter, withoutSet].forEach((without) => {
    test('empty input array', () => {
      expect(without([])).toEqual([]);
      expect(without([], 1, 2, 3)).toEqual([]);
    });

    test('values array is empty', () => {
      expect(without([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('unique values that are present in array but not in values', () => {
      expect(without([1, 2, 3], 2, 3, 4)).toEqual([1]);
      expect(without(['a', 'b', 'c'], 'b', 'c', 'd')).toEqual(['a']);
      expect(without([null, undefined, 1, NaN], undefined, 2, 3)).toEqual([
        null,
        1,
        NaN,
      ]);
    });

    test('all values in array are present in values', () => {
      expect(without([1, 2, 3], 1, 2, 3)).toEqual([]);
      expect(without(['a', 'b', 'c'], 'a', 'b', 'c')).toEqual([]);
      expect(without([null, undefined], null, undefined)).toEqual([]);
    });

    test('NaN values', () => {
      expect(without([1, NaN, 2], NaN, 3, 4)).toEqual([1, 2]);
    });

    test('values array contains duplicates', () => {
      expect(without([1, 2, 2, 3], 2)).toEqual([1, 3]);
      expect(without(['a', 'b', 'b', 'c'], 'b')).toEqual(['a', 'c']);
    });

    test('values array contains different data types', () => {
      expect(without([1, '2', true, null], '2', null)).toEqual([1, true]);
      expect(without(['a', 'b', undefined, 5], undefined, 5)).toEqual([
        'a',
        'b',
      ]);
    });

    test('values array contains objects', () => {
      const obj1 = { id: 1, name: 'John' };
      const obj2 = { id: 2, name: 'Jane' };
      const obj3 = { id: 3, name: 'Doe' };
      const obj4 = { id: 2, name: 'Jane' };
      expect(without([obj1, obj2, obj3], obj2)).toEqual([obj1, obj3]);
      expect(without([obj1, obj2, obj4], obj2)).toEqual([obj1, obj4]);
    });
  });
});
