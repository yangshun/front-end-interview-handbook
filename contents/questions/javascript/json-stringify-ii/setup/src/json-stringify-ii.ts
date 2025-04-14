function isCyclic(input: unknown): boolean {
  const seen = new Set();

  function dfsHelper(value: unknown): boolean {
    if (typeof value !== 'object' || value === null) {
      return false;
    }

    seen.add(value);
    return Object.values(value).some(
      (value_) => seen.has(value_) || dfsHelper(value_),
    );
  }

  return dfsHelper(input);
}

const QUOTE_ESCAPE = /"/g;

export default function jsonStringify(value: unknown): string | undefined {
  if (isCyclic(value)) {
    throw new TypeError('Converting circular structure to JSON');
  }

  if (typeof value === 'bigint') {
    throw new TypeError('Do not know how to serialize a BigInt');
  }

  if (value === null) {
    // Handle null first because the type of null is 'object'.
    return 'null';
  }

  const type = typeof value;

  if (type === 'number') {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
      // For NaN and Infinity we return 'null'.
      return 'null';
    }
    return String(value);
  }

  if (type === 'boolean') {
    return String(value);
  }

  if (type === 'function' || type === 'undefined' || type === 'symbol') {
    return undefined; // Not the string 'undefined'.
  }

  if (type === 'string') {
    // Wrap in double quotes/
    return `"${(value as string).replace(QUOTE_ESCAPE, '\\"')}"`;
  }

  // At this point `value` is either an array, a plain object,
  // or other unsupported object types such as `Map` and `Set`.
  if (typeof (value as any).toJSON === 'function') {
    // If value has user-provided `toJSON` method, we use that instead.
    return jsonStringify((value as any).toJSON());
  }

  if (Array.isArray(value)) {
    const arrayValues = value.map((item) => jsonStringify(item));
    return `[${arrayValues.join(',')}]`;
  }

  // `value` is a plain object.
  const objectEntries = Object.entries(value as Object)
    .map(([key, value]) => {
      const shouldIgnoreEntry =
        typeof key === 'symbol' ||
        value === undefined ||
        typeof value === 'function' ||
        typeof value === 'symbol';

      if (shouldIgnoreEntry) {
        return;
      }

      return `"${key}":${jsonStringify(value)}`;
    })
    .filter((value) => value !== undefined);

  return `{${objectEntries.join(',')}}`;
}
