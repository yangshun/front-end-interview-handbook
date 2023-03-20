const isCyclic = (input) => {
  const seen = new Set();

  const dfsHelper = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    seen.add(obj);
    return Object.values(obj).some(
      (value) => seen.has(value) || dfsHelper(value),
    );
  };

  return dfsHelper(input);
};

/**
 * @param {*} value
 * @return {string}
 */
export default function jsonStringify(data) {
  const quotes = '"';
  const QUOTE_ESCAPE = /"/g;

  if (isCyclic(data)) {
    throw new TypeError('Converting circular structure to JSON');
  }

  if (typeof data === 'bigint') {
    throw new TypeError('Do not know how to serialize a BigInt');
  }

  if (data === null) {
    // Handle null first because the type of null is 'object'.
    return 'null';
  }

  const type = typeof data;

  if (type === 'number') {
    if (Number.isNaN(data) || !Number.isFinite(data)) {
      // For NaN and Infinity we return 'null'.
      return 'null';
    }
    return String(data);
  }

  if (type === 'boolean') {
    return String(data);
  }

  if (type === 'function' || type === 'undefined' || type === 'symbol') {
    return undefined; // Not the string 'undefined'.
  }

  if (type === 'string') {
    return quotes + data.replace(QUOTE_ESCAPE, '\\"') + quotes;
  }

  // At this point `data` is either an array, a plain object,
  // or other unsupported object types such as `Map` and `Set`.
  if (typeof data.toJSON === 'function') {
    // If data has user-provided `toJSON` method, we use that instead.
    return jsonStringify(data.toJSON());
  }

  if (data instanceof Array) {
    // Array.prototype.toString will be invoked implicitly during string concatenation.
    return '[' + data.map((item) => jsonStringify(item)) + ']';
  }

  // `data` is a plain object.
  const entries = Object.entries(data)
    .map(([key, value]) => {
      const shouldIgnoreEntry =
        typeof key === 'symbol' ||
        value === undefined ||
        typeof value === 'function' ||
        typeof value === 'symbol';

      if (shouldIgnoreEntry) {
        return;
      }

      return quotes + key + quotes + ':' + jsonStringify(value);
    })
    .filter((value) => value !== undefined);

  // Again, Object.prototype.toString will be invoked implicitly during string concatenation
  return '{' + entries + '}';
}
