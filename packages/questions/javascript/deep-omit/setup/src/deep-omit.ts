export default function deepOmit(val: unknown, keys: Array<string>): unknown {
  // Handle arrays.
  if (Array.isArray(val)) {
    return val.map((item) => deepOmit(item, keys));
  }

  // Handle objects.
  if (isPlainObject(val)) {
    const newObj: Record<string, unknown> = {};
    for (const key in val as Object) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit((val as any)[key], keys);
      }
    }

    return newObj;
  }

  // Other values can be returned directly.
  return val;
}

function isPlainObject(value: unknown): boolean {
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
