export default function without<T>(
  array: Array<T>,
  ...values: Array<T>
): Array<T> {
  return array.filter((value) => !values.includes(value));
}
