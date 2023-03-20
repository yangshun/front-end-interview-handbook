/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  const res = [];
  const copy = value.slice();

  while (copy.length) {
    const item = copy.shift();
    if (Array.isArray(item)) {
      copy.unshift(...item);
    } else {
      res.push(item);
    }
  }

  return res;
}
