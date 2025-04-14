import './function-apply';

describe('Function.prototype.myApply', () => {
  const person = {
    name: 'John',
  };

  function getName(this: any) {
    return this.name;
  }

  function sum(...args: Array<number>) {
    return args.reduce((acc, num) => acc + num, 0);
  }

  test('Function.prototype.myApply is a function', () => {
    expect(typeof Function.prototype.myApply).toBe('function');
  });

  test('`this` is bound', () => {
    expect(getName.myApply(person)).toStrictEqual('John');
  });

  test('with a parameter', () => {
    expect(sum.myApply(null, [1])).toBe(1);
  });
});
