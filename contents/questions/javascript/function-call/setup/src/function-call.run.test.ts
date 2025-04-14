import './function-call';

describe('Function.prototype.myCall', () => {
  const person = {
    name: 'John',
  };

  function getName(this: any) {
    return this.name;
  }

  function sum(...args: Array<number>) {
    return args.reduce((acc, num) => acc + num, 0);
  }

  test('Function.prototype.myCall is a function', () => {
    expect(typeof Function.prototype.myCall).toBe('function');
  });

  test('`this` is bound', () => {
    expect(getName.myCall(person)).toStrictEqual('John');
  });

  test('with a parameter', () => {
    expect(sum.myCall(null, 1)).toBe(1);
  });
});
