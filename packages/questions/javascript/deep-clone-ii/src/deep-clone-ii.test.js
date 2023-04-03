import deepClone from './deep-clone-ii';

/* eslint-disable no-undef */

// TODO: Change tests to test for non-serializable properties in Jest.
describe('deepClone', () => {
  it('single primitive value', () => {
    expect(deepClone(123)).toStrictEqual(123);
    expect(deepClone('foo')).toStrictEqual('foo');
    expect(deepClone(true)).toStrictEqual(true);
    expect(deepClone(null)).toStrictEqual(null);
  });

  it('object with no nesting', () => {
    const obj = { role: 'foo' };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toStrictEqual({ role: 'foo' });
    clonedObj.role = 'bar';
    expect(obj).toStrictEqual({ role: 'foo' });
    expect(clonedObj).toStrictEqual({ role: 'bar' });
  });

  it('object with no nesting and symbol-key prop', () => {
    const symbol = Symbol('bar');
    const obj = { role: 'foo', [symbol]: 'bar' };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toMatchObject({ role: 'foo', [symbol]: 'bar' });
    clonedObj.role = 'bar';
    expect(obj).toMatchObject({ role: 'foo', [symbol]: 'bar' });
  });

  it('object with one-level nesting', () => {
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
      reg: new RegExp('/bar/ig'),
      [symbol]: 'baz',
    };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toMatchObject({
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

    expect(obj).toMatchObject({
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

  it('object with circular references are handled correctly', () => {
    const obj = { a: {} };
    obj.a.b = obj;
    const clonedObj = deepClone(obj);
    clonedObj.a.b = 'something new';
    expect(obj.a.b).toMatchObject(obj);
  });

  it('object prototype is also copied', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const Foo = function () {};
    let foo = new Foo();
    const cloned = deepClone(foo);

    expect(Object.getPrototypeOf(cloned)).toMatchObject(
      Object.getPrototypeOf(foo),
    );
  });
});
