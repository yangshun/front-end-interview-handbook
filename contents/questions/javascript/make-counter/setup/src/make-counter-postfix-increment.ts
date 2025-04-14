export default function makeCounter(initialValue = 0): () => number {
  let count = initialValue;

  return () => {
    return count++;
  };
}
