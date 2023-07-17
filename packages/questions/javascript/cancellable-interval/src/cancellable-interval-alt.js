/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
export default function setCancellableInterval(...args) {
  const timerId = setInterval(...args);

  return () => {
    clearInterval(timerId);
  };
}
