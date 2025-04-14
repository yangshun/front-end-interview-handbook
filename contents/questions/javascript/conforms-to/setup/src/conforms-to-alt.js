/**
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property predicates to conform to.
 * @returns {boolean} Returns true if object conforms, else false.
 */
export default function conformsTo(object, source) {
  // .every() ensures that all predicate must return `true` for `conformsTo` to return `true`.
  return Object.keys(source).every((key) => {
    return (
      Object.hasOwn(source, key) &&
      Object.hasOwn(object, key) &&
      source[key](object[key])
    );
  });
}
