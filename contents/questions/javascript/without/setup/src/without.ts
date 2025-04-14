export default function without<T>(
  array: Array<T>,
  ...values: Array<T>
): Array<T> {
  const result: Array<T> = [];

  // Create a set of all the values in the values arrays.
  const valuesSet: Set<T> = new Set(values);

  for (let i = 0; i < array.length; i++) {
    const value: T = array[i];
    // Check if the value is in the values set.
    if (!valuesSet.has(value)) {
      result.push(value);
    }
  }

  return result;
}
