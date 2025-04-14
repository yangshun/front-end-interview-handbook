import compact from './compact-ii';

describe('compact', () => {
  test('arrays', () => {
    expect(compact([1, 2])).toEqual([1, 2]);
    expect(compact([null, 1])).toEqual([1]);
    expect(compact([false, null])).toEqual([]);
  });

  test('objects', () => {
    expect(compact({ foo: true, bar: 2 })).toEqual({ foo: true, bar: 2 });
    expect(compact({ foo: false, bar: 2 })).toEqual({ bar: 2 });
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
});
