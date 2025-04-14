/**
 * @param {Function} func
 * @return {Function}
 */
export default function curry(func) {
  return function curried(...args) {
    const fn = curried.bind(this, ...args);

    // Define using an arrow function to preserve `this`.
    fn[Symbol.toPrimitive] = () => func.apply(this, args);
    return fn;
  };
}
