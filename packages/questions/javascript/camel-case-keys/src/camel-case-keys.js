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
 * @template {Record<string, unknown>|Array<unknown>} T
 * @param {T} object
 * @return {T}
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
