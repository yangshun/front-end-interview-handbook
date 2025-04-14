import classNames from './classnames';

describe('classNames', () => {
  test('empty values', () => {
    expect(classNames([])).toEqual('');
  });

  test('single value', () => {
    expect(classNames('foo')).toEqual('foo');
  });

  test('two values', () => {
    expect(classNames('foo', 'bar')).toEqual('foo bar');
  });

  test('array values', () => {
    expect(classNames(['foo', 'bar', 'baz'])).toEqual('foo bar baz');
  });

  test('object values', () => {
    expect(classNames({ 'foo-bar': true })).toEqual('foo-bar');
    expect(classNames({ 'foo-bar': false })).toEqual('');
    expect(classNames({ foo: true }, { bar: true })).toEqual('foo bar');
    expect(classNames({ foo: true, bar: false, qux: true })).toEqual('foo qux');
  });

  test('mixed values', () => {
    expect(
      classNames(
        'foo',
        {
          bar: true,
          duck: false,
        },
        'baz',
        { quux: true },
      ),
    ).toEqual('foo bar baz quux');
    expect(
      classNames('boo', true && 'loo', false && 'booz', {
        foo: true,
        bar: false,
        baz: 1,
      }),
    ).toEqual('boo loo foo baz');
  });

  test('ignores falsey values', () => {
    expect(
      classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''),
    ).toEqual('bar 1');
  });

  test('recursively flattens arrays', () => {
    expect(classNames('a', ['b', { c: true, d: false }])).toEqual('a b c');
    expect(classNames('a', ['b', ['c', ['d']]])).toEqual('a b c d');
  });
});
