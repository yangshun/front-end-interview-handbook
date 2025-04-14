/**
 * @param {string} str
 * @return {string}
 */
function camelCase(str) {
  return str
    .toLowerCase()
    .replace(/([_])([a-z])/g, (_match, _p1, p2) => p2.toUpperCase());
}

/**
 * @param Object
 * @return Object
 */
export default function camelCaseKeys(object) {
  if (Array.isArray(object)) {
    return object.map((item) => camelCaseKeys(item));
  }

  if (typeof object !== 'object' || object === null) {
    return object;
  }

  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      camelCase(key),
      camelCaseKeys(value),
    ]),
  );
}
