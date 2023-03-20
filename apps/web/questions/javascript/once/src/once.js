/**
 * @callback func
 * @return {Function}
 */
export default function once(func) {
  let ranOnce = false;
  let value;

  return function (...args) {
    if (!ranOnce) {
      value = func.apply(this, args);
      ranOnce = true;
    }

    return value;
  };
}
