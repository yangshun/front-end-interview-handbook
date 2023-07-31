/**
 * @param {any} value
 * @param {Function} fn
 * @returns any
 */
export default function deepMap(value, fn) {
  return mapHelper(value, fn, value);
}

function isPlainObject(value) {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function mapHelper(element, fn, original) {
  // Handle arrays.
  if (Array.isArray(element)) {
    return element.map((item) => mapHelper(item, fn, original));
  }

  // Handle plain objects.
  if (isPlainObject(element)) {
    return Object.fromEntries(
      Object.entries(element).map(([key, value]) => [
        key,
        mapHelper(value, fn, original),
      ]),
    );
  }

  // Handle other types.
  return fn.call(original, element);
}
