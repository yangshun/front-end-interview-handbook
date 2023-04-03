/**
 * @param {string} str
 * @return {string}
 */
function camelCase(str) {
  if (!/[_]/.test(str)) {
    return str;
  }

  return str
    .toLowerCase()
    .replace(/([_])([a-z])/g, (_match, _p1, p2) => p2.toUpperCase());
}

/**
 * @param {Object} object
 * @return {Object}
 */
export default function camelCaseKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => camelCaseKeys(item));
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      camelCase(key),
      camelCaseKeys(value),
    ]),
  );
}
