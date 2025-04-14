/**
 * @param {number} valueA
 * @return {Function}
 */
export default function sum(valueA) {
  return function (valueB) {
    return valueB === undefined ? valueA : sum(valueA + valueB);
  };
}
