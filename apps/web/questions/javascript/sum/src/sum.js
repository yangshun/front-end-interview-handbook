/**
 * @param {number} number
 * @return {Function}
 */
export default function sum(numberA) {
  return function (numberB) {
    return numberB === undefined ? numberA : sum(numberA + numberB);
  };
}
