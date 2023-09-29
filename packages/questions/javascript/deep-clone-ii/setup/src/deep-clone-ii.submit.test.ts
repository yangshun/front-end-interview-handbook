import deepClone from './deep-clone-ii';

// TODO: Change tests to test for non-serializable properties in Jest.
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

  test('object with one-level nesting', () => {
    const symbol = Symbol('s');
    const date = new Date();
    const obj = {
      num: 0,
      str: '',
      boolean: true,
      unf: undefined,
      nul: null,
      obj: { name: 'foo', id: 1 },
      arr: [0, 1, 2],
      date,
      reg: /\/bar\/ig/,
      [symbol]: 'baz',
    };
    const clonedObj: any = deepClone(obj);
    expect(clonedObj).toStrictEqual({
      num: 0,
      str: '',
      boolean: true,
      unf: undefined,
      nul: null,
      obj: { name: 'foo', id: 1 },
      arr: [0, 1, 2],
      date,
      reg: /\/bar\/ig/,
      [symbol]: 'baz',
    });
    clonedObj.name = 'bar';
    clonedObj.arr.pop();

    expect(obj).toStrictEqual({
      num: 0,
      str: '',
      boolean: true,
      unf: undefined,
      nul: null,
      obj: { name: 'foo', id: 1 },
      arr: [0, 1, 2],
      date,
      reg: /\/bar\/ig/,
      [symbol]: 'baz',
    });
  });

  test('object with circular references', () => {
    const obj: any = { a: {} };
    obj.a.b = obj;
    const clonedObj = deepClone(obj);
    clonedObj.a.b = 'something new';
    expect(obj.a.b).toStrictEqual(obj);
  });

  test('object prototype is also copied', () => {
    const Foo = function () {};
    let foo = new (Foo as any)();
    const cloned = deepClone(foo);

    expect(Object.getPrototypeOf(cloned)).toStrictEqual(
      Object.getPrototypeOf(foo),
    );
  });
});
