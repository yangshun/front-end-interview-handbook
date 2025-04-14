/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
export default function setCancellableTimeout(callback, delay, ...args) {
  let cancelled = false;
  setTimeout(() => {
    if (cancelled) {
      return;
    }

    callback(...args);
  }, delay);

  return () => {
    cancelled = true;
  };
}
