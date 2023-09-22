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
});
