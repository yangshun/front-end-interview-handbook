export default function isMatch(
  object: Record<string, any>,
  source: Record<string, any>,
): boolean {
  for (const key in source) {
    // Check if both values are objects (including arrays, but not null).
    if (
      typeof object[key] === 'object' &&
      typeof source[key] === 'object' &&
      object[key] !== null &&
      source[key] !== null
    ) {
      // Recursively call isMatch for nested objects or arrays.
      if (!isMatch(object[key], source[key])) {
        return false;
      }
    } else if (object[key] !== source[key]) {
      return false;
    }
  }
  return true;
}
