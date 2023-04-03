/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  while (value.some(Array.isArray)) {
    value = [].concat(...value);
  }

  return value;
}
