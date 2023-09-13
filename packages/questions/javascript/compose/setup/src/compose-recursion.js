/**
 * @param {...Function} args
 * @returns Function
 */
export default function compose(...fns) {
  return function (x) {
    function apply(fn, ...rest) {
      if (rest.length === 0) {
        return fn(x);
      }

      return fn(apply(...rest));
    }

    return apply(...fns);
  };
}
