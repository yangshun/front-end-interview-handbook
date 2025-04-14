function isPrimitiveTypeOrFunction(value: unknown): boolean {
  return (
    typeof value !== 'object' || typeof value === 'function' || value === null
  );
}

function getType(value: unknown) {
  const type = typeof value;
  if (type !== 'object') {
    return type;
  }

  return Object.prototype.toString
    .call(value)
    .replace(/^\[object (\S+)\]$/, '$1')
    .toLowerCase();
}

function deepCloneWithCache<T>(value: T, cache: Map<any, any>): T {
  if (isPrimitiveTypeOrFunction(value)) {
    return value;
  }

  const type = getType(value);

  if (type === 'set') {
    const cloned = new Set();
    (value as Set<any>).forEach((item) => {
      cloned.add(deepCloneWithCache(item, cache));
    });
    return cloned as T;
  }

  if (type === 'map') {
    const cloned = new Map();
    (value as Map<any, any>).forEach((value_, key) => {
      cloned.set(key, deepCloneWithCache(value_, cache));
    });
    return cloned as T;
  }

  if (type === 'function') {
    return value;
  }

  if (type === 'array') {
    return (value as Array<any>).map((item) =>
      deepCloneWithCache(item, cache),
    ) as T;
  }

  if (type === 'date') {
    return new Date(value as Date) as T;
  }

  if (type === 'regexp') {
    return new RegExp(value as RegExp) as T;
  }

  if (cache.has(value)) {
    return cache.get(value);
  }

  const cloned = Object.create(Object.getPrototypeOf(value));

  cache.set(value, cloned);
  for (const key of Reflect.ownKeys(value as Object)) {
    const item = (value as any)[key];
    cloned[key] = isPrimitiveTypeOrFunction(item)
      ? item
      : deepCloneWithCache(item, cache);
  }

  return cloned;
}

export default function deepClone<T>(value: T): T {
  return deepCloneWithCache(value, new Map());
}
