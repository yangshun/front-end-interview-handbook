/**
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 */
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

  // Maps/Sets.
  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  // Plain objects.
  const prototype = Object.getPrototypeOf(value);
  if (prototype === null || prototype === Object.prototype) {
    return Object.keys(value).length === 0;
  }

  return true;
}
