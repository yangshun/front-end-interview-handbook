/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  return Array.isArray(value) ? value.flatMap((item) => flatten(item)) : value;
}
