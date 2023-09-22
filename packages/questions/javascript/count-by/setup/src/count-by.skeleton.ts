type IterateeFn<T> = (value: T) => number | string;

export default function countBy<T>(
  array: Array<T>,
  iteratee: IterateeFn<T> | string,
): { [key: string]: number } {
  throw 'Not implemented!';
}
