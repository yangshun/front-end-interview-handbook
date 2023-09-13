const isPrimitiveTypeOrFunction = (value) =>
  typeof value !== 'object' || typeof value === 'function' || value === null;

function getType(value) {
  const type = typeof value;
  if (type !== 'object') {
    return type;
  }

  return Object.prototype.toString
    .call(value)
    .replace(/^\[object (\S+)\]$/, '$1')
    .toLowerCase();
}

function deepCloneWithCache(value, cache) {
  if (isPrimitiveTypeOrFunction(value)) {
    return value;
  }

  const type = getType(value);

  if (type === 'set') {
    const cloned = new Set();
    value.forEach((item) => {
      cloned.add(deepCloneWithCache(item));
    });
    return cloned;
  }

  if (type === 'map') {
    const cloned = new Map();
    value.forEach((value, key) => {
      cloned.set(key, deepCloneWithCache(value));
    });
    return cloned;
  }

  if (type === 'function') {
    return value;
  }

  if (type === 'array') {
    return value.map((item) => deepCloneWithCache(item));
  }

  if (type === 'date') {
    return new Date(value);
  }

  if (type === 'regexp') {
    return new RegExp(value);
  }

  if (cache.has(value)) {
    return cache.get(value);
  }

  const cloned = Object.create(Object.getPrototypeOf(value));

  cache.set(value, cloned);
  for (const key of Reflect.ownKeys(value)) {
    cloned[key] = isPrimitiveTypeOrFunction(value[key])
      ? value[key]
      : deepCloneWithCache(value[key], cache);
  }

  return cloned;
}

/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  return deepCloneWithCache(value, new Map());
}
