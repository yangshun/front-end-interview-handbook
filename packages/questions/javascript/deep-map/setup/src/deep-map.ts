export default function deepMap(value: unknown, fn: Function): unknown {
  return mapHelper(value, fn, value);
}

function isPlainObject(value: unknown): boolean {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

function mapHelper(element: unknown, fn: Function, original: unknown): unknown {
  // Handle arrays.
  if (Array.isArray(element)) {
    return element.map((item) => mapHelper(item, fn, original));
  }

  // Handle plain objects.
  if (isPlainObject(element)) {
    return Object.fromEntries(
      Object.entries(element as Object).map(([key, value]) => [
        key,
        mapHelper(value, fn, original),
      ]),
    );
  }

  // Handle other types.
  return fn.call(original, element);
}
