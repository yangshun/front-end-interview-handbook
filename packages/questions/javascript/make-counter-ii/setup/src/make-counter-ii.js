/**
 * @param {number} initialValue
 * @return {{get: Function, increment: Function, decrement: Function, reset: Function }}
 */
export default function makeCounter(initialValue = 0) {
  let count = initialValue;

  return {
    get: () => count,
    increment: () => ++count,
    decrement: () => --count,
    reset: () => (count = initialValue),
  };
}
