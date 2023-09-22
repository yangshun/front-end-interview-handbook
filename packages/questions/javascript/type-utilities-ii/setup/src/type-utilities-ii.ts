export function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

// Alternative to isArray.
export function isArrayAlt(value: unknown): boolean {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  return value.constructor === Array;
}

export function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}

export function isObject(value: unknown): boolean {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const type = typeof value;
  return type === 'object' || type === 'function';
}

export function isPlainObject(value: unknown): boolean {
  // For null and undefined.
  if (value == null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

// Alternative to isPlainObject, Lodash's implementation.
export function isPlainObjectAlternative(value: unknown): boolean {
  if (!isObject(value)) {
    return false;
  }

  // For objects created via Object.create(null);
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }

  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(value) === proto;
}
