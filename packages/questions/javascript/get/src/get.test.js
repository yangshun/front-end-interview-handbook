import get from './get';

describe('get', () => {
  test('empty object', () => {
    expect(get({}, 'a')).toEqual(undefined);
    expect(get({}, 'a.b')).toEqual(undefined);
  });

  test('path contains one segment', () => {
    expect(get({ a: 1 }, 'a')).toEqual(1);
    expect(get({ c: 2 }, 'b')).toEqual(undefined);
    expect(get({ c: { foo: 1 } }, 'c')).toEqual({ foo: 1 });
  });

  test('path contains two segments', () => {
    expect(get({ a: { b: 2 }, c: 1 }, 'a.b')).toEqual(2);
    expect(get({ a: { b: 2 }, c: 1 }, 'a.c')).toEqual(undefined);
    expect(get({ a: { b: 2, c: { foo: 2 } } }, 'a.c')).toEqual({
      foo: 2,
    });
  });

  test('path contains multiple segments', () => {
    expect(get({ a: { b: 2, c: { d: 0 } }, c: 1 }, 'a.c.d')).toEqual(0);
    expect(get({ a: { b: 2 }, c: 1 }, 'a.c.e.f')).toEqual(undefined);
    expect(
      get({ a: { b: 2, c: { d: { e: { foo: 3 } } } }, c: 1 }, 'a.c.d.e'),
    ).toEqual({ foo: 3 });
  });

  test('array values', () => {
    expect(get({ a: { b: [1, 2, 3], c: { d: 0 } }, c: 1 }, 'a.b.2')).toEqual(3);
    expect(
      get({ a: { b: [1, 2, 3, { c: 'bar' }], c: { d: 0 } }, c: 1 }, 'a.b.3.c'),
    ).toEqual('bar');
  });

  test('uses default value', () => {
    expect(get({}, 'a', 1)).toEqual(1);
    expect(get({}, 'a.b', 2)).toEqual(2);
    expect(get({ c: 2 }, 'b', 3)).toEqual(3);
  });

  test('correctly returns null values', () => {
    expect(get({ b: null }, 'b')).toEqual(null);
    expect(get({ a: { b: 2, c: null }, c: 1 }, 'a.c')).toEqual(null);
    expect(
      get({ a: { b: 2, c: { d: { e: null } } }, c: 1 }, 'a.c.d.e'),
    ).toEqual(null);
  });

  test('path as an array', () => {
    expect(get({ a: { b: 2 }, c: 1 }, ['c'])).toEqual(1);
    expect(get({ a: { b: 2 }, c: 1 }, ['a', 'c'])).toEqual(undefined);
    expect(get({ a: { b: 2, c: { foo: 2 } } }, ['a', 'c'])).toEqual({
      foo: 2,
    });
    expect(
      get({ a: { b: [1, 2, 3, { c: 'bar' }], c: { d: 0 } }, c: 1 }, [
        'a',
        'b',
        '3',
        'c',
      ]),
    ).toEqual('bar');
  });

  test('access index of non-primitives', () => {
    expect(get({ a: { b: true } }, 'a.b.c')).toEqual(undefined);
    expect(get({ a: { b: null } }, 'a.b.c')).toEqual(undefined);
    expect(get({ a: { b: undefined } }, 'a.b.c')).toEqual(undefined);
    expect(get({ a: { b: 2 } }, 'a.b.c')).toEqual(undefined);
    expect(get({ a: { b: 'foo' } }, 'a.b.c')).toEqual(undefined);
  });
});
