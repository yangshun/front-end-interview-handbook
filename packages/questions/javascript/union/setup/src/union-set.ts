export default function union(...arrays: Array<Array<number>>): Array<number> {
  const result = new Set<number>();

  arrays.forEach((array) => {
    array.forEach((item) => {
      // Add `item` to the `result`. Set will automatically ensure uniqueness.
      result.add(item);
    });
  });

  // Convert the `result` back to an array before returning.
  return Array.from(result);
}
