/**
 * @param {*} value
 * @returns Promise
 */
export default function promiseResolve(value) {
  if (value instanceof Promise) {
    return value;
  }

  return new Promise((resolve) => resolve(value));
}
