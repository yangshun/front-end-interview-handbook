/**
 * @param {Object} obj
 * @param {Array} path
 * @param {Object} output
 * @return {Object}
 */
export default function squashObject(object, path = [], output = {}) {
  for (const [key, value] of Object.entries(object)) {
    if (typeof value !== 'object' || value === null) {
      output[path.concat(key).filter(Boolean).join('.')] = value;
    } else {
      squashObject(value, path.concat(key), output);
    }
  }

  return output;
}
