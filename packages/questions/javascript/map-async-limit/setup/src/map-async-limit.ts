export default function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size: number = Infinity,
): Promise<Array<U>> {
  if (iterable.length === 0) {
    return Promise.resolve([]);
  }

  return Promise.all(iterable.slice(0, size).map(callbackFn)).then((results) =>
    mapAsyncLimit(iterable.slice(size), callbackFn, size).then((rest) => [
      ...results,
      ...rest,
    ]),
  );
}
