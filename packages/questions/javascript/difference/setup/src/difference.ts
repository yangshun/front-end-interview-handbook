export default function difference<T>(
  array: Array<T>,
  values: Array<T>,
): Array<T> {
  const result = [];

  // Create a set of all the values in the values arrays.
  const valuesSet = new Set(values);

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    // Check if the value is in the values set.
    if (!valuesSet.has(value) && !(value === undefined && !(i in array))) {
      result.push(value);
    }
  }

  return result;
}
