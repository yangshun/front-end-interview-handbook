/**
 * @callback func
 * @return {Function}
 */
export default function curry(func) {
  return function curried(...args) {
    if (args.length === func.length) {
      return func.apply(this, args);
    }

    return function (...args2) {
      return curried.apply(this, [...args, ...args2]);
    };
  };
}
