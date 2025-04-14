import squashObject from './squash-object';

describe('squashObject', () => {
  test('empty', () => {
    expect(squashObject({})).toEqual({});
  });

  test('no nesting', () => {
    expect(squashObject({ a: '1', b: 'b' })).toEqual({ a: '1', b: 'b' });
  });

  test('one level of nesting', () => {
    expect(
      squashObject({
        a: 5,
        c: {
          f: 9,
        },
      }),
    ).toEqual({ a: 5, 'c.f': 9 });
  });

  test('multiple levels of nesting', () => {
    expect(
      squashObject({
        a: 5,
        b: 6,
        c: {
          f: 9,
          g: {
            m: 17,
            n: 3,
          },
        },
      }),
    ).toEqual({ a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 });
  });

  test('arrays', () => {
    expect(
      squashObject({
        a: ['hi', 'bye'],
      }),
    ).toEqual({
      'a.0': 'hi',
      'a.1': 'bye',
    });
  });

  test('null-ish values', () => {
    expect(
      squashObject({
        a: {
          a: 0,
          b: null,
          c: false,
          d: undefined,
        },
      }),
    ).toEqual({
      'a.a': 0,
      'a.b': null,
      'a.c': false,
      'a.d': undefined,
    });
  });

  describe('empty keys', () => {
    test('single layer of empty key', () => {
      expect(
        squashObject({
          foo: {
            '': 0,
            a: 1,
          },
        }),
      ).toEqual({
        foo: 0,
        'foo.a': 1,
      });
    });

    test('nested empty keys', () => {
      expect(
        squashObject({
          foo: {
            '': {
              '': 1,
              bar: 2,
            },
            a: 1,
          },
        }),
      ).toEqual({
        foo: 1,
        'foo.bar': 2,
        'foo.a': 1,
      });
    });
  });

  test('everything', () => {
    expect(
      squashObject({
        a: 'hi',
        b: {
          a: null,
          b: ['foo', '', null, 'bar'],
          d: 'hello',
          e: {
            a: 'yo',
            b: undefined,
            c: 'sup',
            d: 0,
            f: [
              { foo: 123, bar: 123 },
              { foo: 465, bar: 456 },
            ],
          },
        },
        c: 'world',
      }),
    ).toEqual({
      a: 'hi',
      'b.a': null,
      'b.b.0': 'foo',
      'b.b.1': '',
      'b.b.2': null,
      'b.b.3': 'bar',
      'b.d': 'hello',
      'b.e.a': 'yo',
      'b.e.b': undefined,
      'b.e.c': 'sup',
      'b.e.d': 0,
      'b.e.f.0.foo': 123,
      'b.e.f.0.bar': 123,
      'b.e.f.1.foo': 465,
      'b.e.f.1.bar': 456,
      c: 'world',
    });
  });
});
