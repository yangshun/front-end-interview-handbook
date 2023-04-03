const isPrimitiveTypeOrFunction = (value) =>
  typeof value !== 'object' || typeof value === 'function' || value === null;

function getType(value) {
  const lowerCaseTheFirstLetter = (str) => str[0].toLowerCase() + str.slice(1);
  const type = typeof value;
  if (type !== 'object') return type;

  return lowerCaseTheFirstLetter(
    Object.prototype.toString.call(value).replace(/^\[object (\S+)\]$/, '$1'),
  );
}

/**
 * @param {*} value
 * @return {*}
 */
export default function deepClone(value, cache = new Map()) {
  if (isPrimitiveTypeOrFunction(value)) {
    return value;
  }

  const type = getType(value);

  if (type === 'set') {
    const cloned = new Set();
    value.forEach((item) => {
      cloned.add(deepClone(item));
    });
    return cloned;
  }

  if (type === 'map') {
    const cloned = new Map();
    value.forEach((value, key) => {
      cloned.set(key, deepClone(value));
    });
    return cloned;
  }

  if (type === 'function') {
    return value;
  }

  if (type === 'array') {
    return value.map((item) => deepClone(item));
  }

  if (type === 'date') {
    return new Date(value);
  }

  if (type === 'regExp') {
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
      : deepClone(value[key], cache);
  }

  return cloned;
}
