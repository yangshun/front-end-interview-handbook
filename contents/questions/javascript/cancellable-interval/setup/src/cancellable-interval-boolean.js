/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
export default function setCancellableInterval(callback, delay, ...args) {
  let cancelled = false;
  setInterval(() => {
    if (cancelled) {
      return;
    }

    callback(...args);
  }, delay);

  return () => {
    cancelled = true;
  };
}
