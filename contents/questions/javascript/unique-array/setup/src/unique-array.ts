export default function uniqueArray<T extends ReadonlyArray<unknown>>(
  array: T,
): Array<T[number]> {
  return Array.from(new Set(array));
}
