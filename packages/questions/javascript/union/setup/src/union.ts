export default function union(...arrays: Array<any>): Array<any> {
  const result: Array<any> = [];

  arrays.forEach((array: Array<any>) => {
    array.forEach((item: any) => {
      // Check if the result array contains the `item`; if not, add it to the result.
      if (!result.includes(item)) {
        result.push(item);
      }
    });
  });

  return result;
}
