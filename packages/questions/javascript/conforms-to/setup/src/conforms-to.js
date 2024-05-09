/**
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns true if object conforms, else false.
 */
export default function conformsTo(object, source) {
  for (const key in source) {
    // Ensure the property is not inherited.
    if (Object.hasOwn(source, key)) {
      // Return `false` immediately if any predicate is not fulfilled.
      if (!(key in object) || !source[key](object[key])) {
        return false;
      }
    }
  }
  return true;
}
