export default function cycle<T>(...values: Array<T>): () => T {
  let index = -1;

  return () => {
    index = (index + 1) % values.length;
    return values[index];
  };
}
