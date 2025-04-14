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

  function greeting(this: any, prefix: string, message: string) {
    return `${prefix} ${this.name}, ${message}`;
  }

  test('Function.prototype.myCall is a function', () => {
    expect(typeof Function.prototype.myCall).toBe('function');
  });

  test('`this` is bound', () => {
    expect(getName.myCall(person)).toStrictEqual('John');
  });

  describe('without `this`', () => {
    test('single parameter', () => {
      expect(sum.myCall(null, 1)).toBe(1);
    });

    test('two parameters', () => {
      expect(sum.myCall(null, 1, 2)).toBe(3);
    });

    test('three parameters', () => {
      expect(sum.myCall(null, 1, 2, 3)).toBe(6);
    });
  });

  test('`this` and parameters', () => {
    expect(greeting.myCall(person, 'Hello', 'how are you?')).toStrictEqual(
      'Hello John, how are you?',
    );
  });
});
