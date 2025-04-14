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
