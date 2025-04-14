export default function isMatch(
  object: Record<string, any>,
  source: Record<string, any>,
): boolean {
  // .every() ensures that all predicate must return `true` for `isMatch` to return `true`.
  return Object.keys(source).every((key) => {
    if (
      typeof object[key] === 'object' &&
      typeof source[key] === 'object' &&
      object[key] !== null &&
      source[key] !== null
    ) {
      // Recursively call isMatch for nested objects or arrays.
      return isMatch(object[key], source[key]);
    }
    // Direct comparison for non-object types or if one value is null.
    return object[key] === source[key];
  });
}
