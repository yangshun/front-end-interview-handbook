/**
 * @param {Promise<any>} promise
 * @param {number} duration
 * @return {Promise<any>}
 */
export default function promiseTimeout(promise, duration) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject('Promise timeout');
    }, duration);

    promise
      .then(resolve)
      .catch(reject)
      .finally(() => {
        clearTimeout(timeoutId);
      });
  });
}
