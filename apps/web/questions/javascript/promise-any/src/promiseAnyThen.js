/**
 * @param {Array} iterable
 * @return {Promise}
 */
export default function promiseAny(iterable) {
  return new Promise((resolve, reject) => {
    if (iterable.length === 0) {
      reject(new AggregateError([]));
    }

    let pending = iterable.length;
    const errors = new Array(iterable.length);

    iterable.forEach((item, index) =>
      Promise.resolve(item).then(
        (value) => {
          resolve(value);
        },
        (reason) => {
          errors[index] = reason;
          pending--;

          if (pending === 0) {
            reject(new AggregateError(errors));
          }
        },
      ),
    );
  });
}
