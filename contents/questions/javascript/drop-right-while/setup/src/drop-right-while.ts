export default function dropRightWhile<T>(
  array: Array<T>,
  predicate: (value: T, index: number, array: Array<T>) => boolean,
): Array<T> {
  let index = array.length - 1;

  while (index >= 0 && predicate(array[index], index, array)) {
    index--;
  }

  return array.slice(0, index + 1);
}
