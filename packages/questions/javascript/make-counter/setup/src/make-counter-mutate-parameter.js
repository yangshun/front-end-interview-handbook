/**
 * @param {number} value
 * @return {Function}
 */
export default function makeCounter(value = 0) {
  return () => value++;
}
