/**
 * @param {*} value
 * @return {*}
 */
export default function deepClone(value) {
  if (typeof value !== 'object' || value === null) return value;

  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, value]) => [key, deepClone(value)]),
  );
}
