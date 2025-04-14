/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
export default function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
  if (iterable.length === 0) {
    return Promise.resolve([]);
  }

  const currentChunk = iterable.slice(0, size);
  const remainingItems = iterable.slice(size);

  return Promise.all(currentChunk.map(callbackFn)).then((results) =>
    mapAsyncLimit(remainingItems, callbackFn, size).then((rest) => [
      ...results,
      ...rest,
    ]),
  );
}
