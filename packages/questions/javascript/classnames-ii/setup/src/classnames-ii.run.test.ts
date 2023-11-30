import classNames from './classnames-ii';

describe('classNames', () => {
  test('empty values', () => {
    expect(classNames([])).toEqual('');
  });

  test('single value', () => {
    expect(classNames('foo')).toEqual('foo');
  });

  test('duplicate values', () => {
    expect(classNames('foo', 'foo')).toEqual('foo');
    expect(classNames({ foo: true }, { foo: true })).toEqual('foo');
  });

  test('turn off values', () => {
    expect(classNames({ foo: true, bar: true }, { foo: false })).toEqual('bar');
  });

  test('function values', () => {
    expect(classNames('foo', () => 'bar')).toEqual('foo bar');
    expect(classNames('foo', () => 'foo')).toEqual('foo');
  });
});
