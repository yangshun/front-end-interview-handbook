export default function toggle<T>(...values: Array<T>): () => T {
  let index = 0;

  return () => {
    const currentValue = values[index];
    index = (index + 1) % values.length;
    return currentValue;
  };
}
