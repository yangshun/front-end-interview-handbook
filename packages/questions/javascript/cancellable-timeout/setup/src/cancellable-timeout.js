/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
export default function setCancellableTimeout(callback, delay, ...args) {
  const timerId = setTimeout(callback, delay, ...args);

  return () => {
    clearTimeout(timerId);
  };
}
