export default function union<T>(...arrays: Array<Array<T>>): Array<T> {
  const result = new Set<T>();

  arrays.forEach((array) => {
    array.forEach((item) => {
      // Add `item` to the `result`. Set will automatically ensure uniqueness.
      result.add(item);
    });
  });

  // Convert the `result` back to an array before returning.
  return Array.from(result);
}
