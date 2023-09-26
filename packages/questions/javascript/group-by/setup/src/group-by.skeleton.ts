type IterateeFn<T> = (value: T) => number | string;

export default function groupBy<T>(
  array: Array<T>,
  iteratee: IterateeFn<T> | string,
): Record<string, Array<T>> {
  throw 'Not implemented!';
}
