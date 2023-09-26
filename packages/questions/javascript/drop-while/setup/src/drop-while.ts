export default function dropWhile<T>(
  array: Array<T>,
  predicate: (value: T, index: number, array: Array<T>) => boolean,
): Array<T> {
  let index = 0;

  while (index < array.length && predicate(array[index], index, array)) {
    index++;
  }

  return array.slice(index);
}
