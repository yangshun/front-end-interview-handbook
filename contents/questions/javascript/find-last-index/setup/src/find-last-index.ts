export default function findLastIndex<T>(
  array: Array<T>,
  predicate: (value: T, index: number, array: Array<T>) => boolean,
  fromIndex = array.length - 1,
): number {
  let startIndex =
    fromIndex < 0
      ? Math.max(array.length + fromIndex, 0)
      : Math.min(fromIndex, array.length - 1);

  let index = startIndex;
  // Iterate from the right.
  while (index >= 0) {
    if (predicate(array[index], index, array)) {
      return index;
    }
    index--;
  }

  return -1;
}
