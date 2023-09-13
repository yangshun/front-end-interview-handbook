/**
 * @param {...Function} args
 * @returns Function
 */
export default function compose(...fns) {
  return function (x) {
    return fns.reduceRight((result, func) => func(result), x);
  };
}
