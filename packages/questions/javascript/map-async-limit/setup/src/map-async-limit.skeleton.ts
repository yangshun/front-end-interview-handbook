export default function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size?: number,
): Promise<Array<U>> {
  throw 'Not implemented';
}
