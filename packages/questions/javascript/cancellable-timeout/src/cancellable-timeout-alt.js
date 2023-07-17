/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
export default function setCancellableTimeout(...args) {
  const timerId = setTimeout(...args);

  return () => {
    clearTimeout(timerId);
  };
}
