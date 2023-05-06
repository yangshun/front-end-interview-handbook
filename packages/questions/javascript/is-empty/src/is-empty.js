// Refer to https://github.com/lodash/lodash/blob/4.17.15-es/TODO_REPLACE_ME.js

export default function isEmpty(value) {
  if (value == null) {
    return true;
  }

  const valueType = typeof value;

  // Arrays/Strings/Buffers.
  if (
    Array.isArray(value) ||
    valueType === 'string' ||
    Buffer.isBuffer(value)
  ) {
    return value.length === 0;
  }

  // Map/Set.
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  // Plain object.
  const prototype = Object.getPrototypeOf(value);
  if (prototype === null || prototype === Object.prototype) {
    return Object.keys(value).length === 0;
  }

  return true;
}
