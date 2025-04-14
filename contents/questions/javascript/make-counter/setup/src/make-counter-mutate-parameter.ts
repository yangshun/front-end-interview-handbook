export default function makeCounter(value = 0): () => number {
  return () => value++;
}
