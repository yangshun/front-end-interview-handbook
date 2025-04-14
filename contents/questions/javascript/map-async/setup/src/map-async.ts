export default function mapAsync<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
): Promise<Array<U>> {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = iterable.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }

    iterable.forEach((item, index) => {
      callbackFn(item)
        .then((value) => {
          results[index] = value;
          unresolved -= 1;

          if (unresolved === 0) {
            resolve(results);
          }
        })
        .catch((err) => reject(err));
    });
  });
}
