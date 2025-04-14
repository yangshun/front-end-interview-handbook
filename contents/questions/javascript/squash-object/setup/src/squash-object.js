/**
 * @param {Object} obj
 * @return {Object}
 */
export default function squashObject(obj) {
  function squashImpl(obj_, path, output) {
    for (const [key, value] of Object.entries(obj_)) {
      if (typeof value !== 'object' || value === null) {
        output[path.concat(key).filter(Boolean).join('.')] = value;
      } else {
        squashImpl(value, path.concat(key), output);
      }
    }
  }

  const out = {};
  squashImpl(obj, [], out);
  return out;
}
