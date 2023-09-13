/**
 * @param {number} value The number to check.
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
 */
export default function inRange(value, startParam, endParam) {
  const [start, end] =
    endParam !== undefined ? [startParam, endParam] : [0, startParam];

  return Math.min(start, end) <= value && value < Math.max(start, end);
}
