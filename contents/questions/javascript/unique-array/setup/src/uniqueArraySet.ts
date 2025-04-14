export default function uniqueArray<T extends ReadonlyArray<unknown>>(
  array: T,
): Array<T[number]> {
  const result: Array<T[number]> = [];
  const seen = new Set();

  array.forEach((item) => {
    if (!seen.has(item)) {
      result.push(item);
      seen.add(item);
    }
  });

  return result;
}
