export default function mapAsync<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
): Promise<Array<U>> {
  return Promise.all(iterable.map(callbackFn));
}