export default function countBy<T>(
  array: Array<T>,
  iteratee: (value: T) => number | string | undefined,
): Record<string, number> {
  const result: Record<string, number> = Object.create(null);
  for (const element of array) {
    const key = String(iteratee(element));
    result[key] ??= 0;
    result[key]++;
  }
  return result;
}
