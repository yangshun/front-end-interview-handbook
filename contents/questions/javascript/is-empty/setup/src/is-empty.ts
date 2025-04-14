export default function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }

  // Arrays/Strings.
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0;
  }

  // Maps/Sets.
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  // Plain objects.
  const prototype = Object.getPrototypeOf(value);
  if (prototype === null || prototype === Object.prototype) {
    return Object.keys(value).length === 0;
  }

  return true;
}
