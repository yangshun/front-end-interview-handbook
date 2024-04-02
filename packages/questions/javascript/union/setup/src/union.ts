export default function union<T>(...arrays: Array<Array<T>>): Array<T> {
  const result: Array<T> = [];

  arrays.forEach((array) => {
    array.forEach((item: T) => {
      // Check if the result array contains the `item`; if not, add it to the result.
      if (!result.includes(item)) {
        result.push(item);
      }
    });
  });

  return result;
}
