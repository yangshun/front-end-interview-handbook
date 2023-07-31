/**
 * @param {Array|Object} value
 * @return {Array|Object}
 */
export default function compact(value) {
  if (typeof value !== 'object' || value == null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.filter((item) => item).map((item) => compact(item));
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, compact(value)]),
  );
}
