/**
 * @param {Promise<any>} promise
 * @param {number} duration
 * @return {Promise<any>}
 */
export default function promiseTimeout(promise, duration) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject('Promise timeout');
    }, duration);
  });

  return Promise.race([promise, timeout]);
}
