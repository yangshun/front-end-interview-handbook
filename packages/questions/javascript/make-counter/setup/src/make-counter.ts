export default function makeCounter(initialValue: number = 0): () => number {
  let count = initialValue - 1;

  return () => {
    count += 1;
    return count;
  };
}
