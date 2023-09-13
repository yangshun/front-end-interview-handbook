/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  for (let i = 0; i < value.length; ) {
    if (Array.isArray(value[i])) {
      value.splice(i, 1, ...value[i]);
    } else {
      i++;
    }
  }

  return value;
}
