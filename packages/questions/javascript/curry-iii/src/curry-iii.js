/**
 * @callback func
 * @return {Function}
 */
export default function curry(func) {
  return function curried(...args) {
    function fn(...args2) {
      return curried.apply(this, [...args, ...args2]);
    }
    // Define using an arrow function to preserve `this`.
    fn[Symbol.toPrimitive] = () => {
      return func.apply(this, args);
    };
    return fn;
  };
}
