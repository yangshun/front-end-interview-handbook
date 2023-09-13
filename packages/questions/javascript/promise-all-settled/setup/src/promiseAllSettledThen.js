/**
 * @param {Array} iterable
 * @return {Promise<Array<{status: 'fulfilled', value: *}|{status: 'rejected', reason: *}>>}
 */
export default function promiseAllSettled(iterable) {
  return new Promise((resolve) => {
    const results = new Array(iterable.length);
    let pending = iterable.length;

    if (pending === 0) {
      resolve(results);
      return;
    }

    iterable.forEach((item, index) => {
      Promise.resolve(item)
        .then(
          (value) => {
            results[index] = {
              status: 'fulfilled',
              value,
            };
          },
          (reason) => {
            results[index] = {
              status: 'rejected',
              reason,
            };
          },
        )
        .finally(() => {
          pending -= 1;
          if (pending === 0) {
            resolve(results);
          }
        });
    });
  });
}
