/**
 * @param {*} value
 * @return {string}
 */
export default function jsonStringify(value) {
  if (Array.isArray(value)) {
    const arrayValues = value.map((item) => jsonStringify(item)).join(',');
    return `[${arrayValues}]`;
  }

  if (typeof value === 'object' && value !== null) {
    const objectValues = Object.entries(value)
      .map(([key, value]) => `"${key}":${jsonStringify(value)}`)
      .join(',');
    return `{${objectValues}}`;
  }

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return String(value);
}
