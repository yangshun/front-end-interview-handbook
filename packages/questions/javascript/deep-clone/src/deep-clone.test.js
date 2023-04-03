import deepClone from './deep-clone';

/* eslint-disable no-undef */
describe('deepClone', () => {
  test('Single primitive value', () => {
    expect(deepClone('foo')).toEqual('foo');
    expect(deepClone(123)).toEqual(123);
    expect(deepClone(true)).toEqual(true);
    expect(deepClone(false)).toEqual(false);
    expect(deepClone(null)).toEqual(null);
  });

  test('Object with no nesting', () => {
    const obj = { role: 'foo' };
    const clonedObj = deepClone(obj);
    clonedObj.role = 'bar';
    expect(obj).toEqual({ role: 'foo' });
  });

  test('Object with one-level nesting', () => {
    const obj = { user: { role: 'admin', id: '123' } };
    const clonedObj = deepClone(obj);
    clonedObj.user.role = 'bar';
    expect(obj).toEqual({ user: { role: 'admin', id: '123' } });
  });

  test('Object with two-level nesting', () => {
    const obj = { a: { b: { c: 'd' } }, e: 'f' };
    const clonedObj = deepClone(obj);
    clonedObj.a.b = {};
    expect(obj).toEqual({ a: { b: { c: 'd' } }, e: 'f' });
  });

  test('Object with arrays', () => {
    const obj = { foo: [{ bar: 'baz' }] };
    const clonedObj = deepClone(obj);
    clonedObj.foo[0].bar = 'bax';

    expect(obj).toEqual({ foo: [{ bar: 'baz' }] });
  });

  test('Array with objects', () => {
    const obj = [{ a: 'foo' }, { b: 'bar' }];
    const clonedObj = deepClone(obj);
    clonedObj[1].b = 'baz';

    expect(obj).toEqual([{ a: 'foo' }, { b: 'bar' }]);
  });

  test('Array with nested objects', () => {
    const obj = [{ a: { id: 'foo' } }, { b: { id: 'baz' } }];
    const clonedObj = deepClone(obj);
    clonedObj[1].b = { id: 'bax' };

    expect(obj).toEqual([{ a: { id: 'foo' } }, { b: { id: 'baz' } }]);
  });
});
