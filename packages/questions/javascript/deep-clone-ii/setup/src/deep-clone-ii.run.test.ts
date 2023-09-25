import deepClone from './deep-clone-ii';

describe('deepClone', () => {
  test('single primitive value', () => {
    expect(deepClone(123)).toStrictEqual(123);
    expect(deepClone('foo')).toStrictEqual('foo');
    expect(deepClone(true)).toStrictEqual(true);
    expect(deepClone(null)).toStrictEqual(null);
  });

  test('object with no nesting', () => {
    const obj = { role: 'foo' };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toStrictEqual({ role: 'foo' });
    clonedObj.role = 'bar';
    expect(obj).toStrictEqual({ role: 'foo' });
    expect(clonedObj).toStrictEqual({ role: 'bar' });
  });

  test('object with no nesting and symbol-key prop', () => {
    const symbol = Symbol('bar');
    const obj = { role: 'foo', [symbol]: 'bar' };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toStrictEqual({ role: 'foo', [symbol]: 'bar' });
    clonedObj.role = 'bar';
    expect(obj).toStrictEqual({ role: 'foo', [symbol]: 'bar' });
  });

  test('object with circular references', () => {
    const obj: any = { a: {} };
    obj.a.b = obj;
    const clonedObj = deepClone(obj);
    clonedObj.a.b = 'something new';
    expect(obj.a.b).toStrictEqual(obj);
  });
});
