export default function uniqueArray<T extends ReadonlyArray<unknown>>(
  array: T,
): Array<T[number]> {
  const result: Array<T[number]> = [];

  array.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });

  return result;
}
