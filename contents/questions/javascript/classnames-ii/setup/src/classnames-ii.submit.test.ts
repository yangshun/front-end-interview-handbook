import classNames from './classnames-ii';

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

  describe('duplicate values', () => {
    test('isolated', () => {
      expect(classNames('foo', 'foo')).toEqual('foo');
    });

    test('composite', () => {
      expect(classNames('foo', 'bar', 'foo')).toEqual('foo bar');
      expect(classNames('foo', { foo: true }, 'bar')).toEqual('foo bar');
      expect(classNames({ foo: true }, { bar: true }, { foo: true })).toEqual(
        'foo bar',
      );
      expect(classNames(1, '1')).toEqual('1');
      expect(classNames('foo', 1, '1')).toEqual('foo 1');
    });

    test('nested', () => {
      expect(classNames('foo', ['foo'])).toEqual('foo');
      expect(classNames('foo', [{ foo: true }])).toEqual('foo');
      expect(classNames([{ foo: true }, { foo: true }])).toEqual('foo');
      expect(classNames([1], '1')).toEqual('1');
    });
  });

  describe('function values', () => {
    test('single', () => {
      expect(classNames(() => 'foo')).toEqual('foo');
    });

    test('composite', () => {
      expect(classNames(() => 'foo', 'bar', 'foo')).toEqual('foo bar');
      expect(classNames(() => 'foo', { foo: true }, 'bar')).toEqual('foo bar');
      expect(classNames(() => 1, '1')).toEqual('1');
      expect(classNames('foo', 1, () => '1')).toEqual('foo 1');
    });

    test('nested', () => {
      expect(classNames('foo', [() => 'foo'])).toEqual('foo');
      expect(classNames('foo', [{ foo: true }, () => 'bar'])).toEqual(
        'foo bar',
      );
    });
  });

  describe('turning off values', () => {
    test('single', () => {
      expect(classNames('foo', { foo: false })).toEqual('');
    });

    test('on before off', () => {
      expect(classNames(() => 'foo', 'bar', { foo: false })).toEqual('bar');
      expect(classNames(() => 'foo', { foo: true }, 'bar')).toEqual('foo bar');
      expect(classNames(() => 1, '1', { 1: false })).toEqual('');
      expect(classNames('foo', 1, () => '1')).toEqual('foo 1');
    });

    test('off before on', () => {
      expect(classNames(() => 'foo', 'bar', { foo: false }, 'foo')).toEqual(
        'bar foo',
      );
      expect(
        classNames(() => 'foo', { foo: false }, { foo: true }, 'bar'),
      ).toEqual('foo bar');
      expect(classNames(() => 1, '1', { 1: false }, 1)).toEqual('1');
    });

    describe('nested', () => {
      test('turn off in nested', () => {
        expect(classNames('foo', [{ foo: false }])).toEqual('');
        expect(classNames('foo', [() => 'foo', { foo: false }])).toEqual('');
      });

      test('turn on in nested', () => {
        expect(classNames('foo', [{ foo: false }, 'foo'])).toEqual('foo');
        expect(
          classNames('foo', [{ foo: false }, 'foo', { foo: false }]),
        ).toEqual('');
      });
    });
  });
});
