export default function without<T>(
  array: Array<T>,
  ...values: Array<T>
): Array<T> {
  const valuesSet = new Set<T>(values);
  return array.filter((value) => !valuesSet.has(value));
}
