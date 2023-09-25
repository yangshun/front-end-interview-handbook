export default function curry(func: Function): Function {
  return function curried(this: any, ...args: Array<any>) {
    const fn: any = curried.bind(this, ...args);

    // Define using an arrow function to preserve `this`.
    fn[Symbol.toPrimitive] = () => func.apply(this, args);
    return fn;
  };
}
