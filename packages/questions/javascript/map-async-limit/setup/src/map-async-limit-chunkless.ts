export default function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size: number = Infinity,
): Promise<Array<U>> {
  return new Promise((resolve, reject) => {
    const results: Array<U> = [];
    let nextIndex = 0;
    let resolved = 0;

    if (iterable.length === 0) {
      resolve(results);
      return;
    }

    function processItem(index: number) {
      nextIndex++;
      callbackFn(iterable[index])
        .then((result) => {
          results[index] = result;
          resolved++;

          if (resolved === iterable.length) {
            resolve(results);
            return;
          }

          if (nextIndex < iterable.length) {
            processItem(nextIndex);
          }
        })
        .catch(reject);
    }

    for (let i = 0; i < Math.min(iterable.length, size); i++) {
      processItem(i);
    }
  });
}
