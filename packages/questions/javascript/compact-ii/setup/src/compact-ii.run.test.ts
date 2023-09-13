import compact from './compact-ii';

describe('compact', () => {
  describe('arrays', () => {
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

    test('remove all falsey values from the input array', () => {
      expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3]);
    });

    test('only falsey values', () => {
      expect(compact([null, undefined, NaN, 0, false, '', ''])).toEqual([]);
    });

    test('no falsey values', () => {
      expect(compact(['hello', true, 123, [], {}])).toEqual([
        'hello',
        true,
        123,
        [],
        {},
      ]);
    });

    test('nested arrays', () => {
      expect(compact([1, [null]])).toEqual([1, []]);
      expect(compact([1, [2, [3]]])).toEqual([1, [2, [3]]]);
    });

    test('nested objects', () => {
      expect(compact([1, { foo: 'bar' }])).toEqual([1, { foo: 'bar' }]);
      expect(compact([1, { foo: null }])).toEqual([1, {}]);
    });

    test('sparse arrays', () => {
      expect(compact([1, , 2, , 3])).toEqual([1, 2, 3]);
      expect(compact([1, , null, 2, , 3])).toEqual([1, 2, 3]);
    });

    test('should not modify the original input array', () => {
      const input = [0, 1, false, 2, '', 3];
      compact(input);
      expect(input).toEqual([0, 1, false, 2, '', 3]);
    });
  });

  describe('objects', () => {
    test('empty object', () => {
      expect(compact({})).toEqual({});
    });

    test('single-key object', () => {
      expect(compact({ foo: true })).toEqual({ foo: true });
      expect(compact({ foo: false })).toEqual({});
      expect(compact({ foo: null })).toEqual({});
      expect(compact({ foo: '' })).toEqual({});
      expect(compact({ foo: 0 })).toEqual({});
    });

    test('multiple-key object', () => {
      expect(compact({ foo: true, bar: 2 })).toEqual({ foo: true, bar: 2 });
      expect(compact({ foo: false, bar: 2 })).toEqual({ bar: 2 });
    });

    test('nested arrays', () => {
      expect(compact({ foo: true, bar: ['foo', 1, 2, 'bar'] })).toEqual({
        foo: true,
        bar: ['foo', 1, 2, 'bar'],
      });
      expect(compact({ foo: true, bar: [null, 1, 2, false] })).toEqual({
        foo: true,
        bar: [1, 2],
      });
    });

    test('nested objects', () => {
      expect(compact({ foo: true, bar: { baz: 1, qux: 2 } })).toEqual({
        foo: true,
        bar: {
          baz: 1,
          qux: 2,
        },
      });
      expect(compact({ foo: null, bar: { baz: null, qux: 2 } })).toEqual({
        bar: {
          qux: 2,
        },
      });
    });

    test('should not modify the original input object', () => {
      const input = { foo: false, bar: 2 };
      compact(input);
      expect(input).toEqual({ foo: false, bar: 2 });
    });
  });
});
