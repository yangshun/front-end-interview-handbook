export default function fromPairs<T>(
  pairs: Array<[string | number, T]>,
): Record<string | number, T> {
  const result: Record<string, T> = {};

  for (const [key, value] of pairs) {
    result[key] = value;
  }

  return result;
}
