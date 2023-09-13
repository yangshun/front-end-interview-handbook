/**
 * @param {...Function} args
 * @returns Function
 */
export default function compose(...fns) {
  return function (x) {
    let result = x;

    for (let i = fns.length - 1; i >= 0; i--) {
      result = fns[i](result);
    }

    return result;
  };
}
