export default async function mapAsyncLimit<T, U>(
  iterable: Array<T>,
  callbackFn: (value: T) => Promise<U>,
  size: number = Infinity,
): Promise<Array<U>> {
  const results = [];

  for (let i = 0; i < iterable.length; i += size) {
    const chunk = iterable.slice(i, i + size);
    const chunkResults = await Promise.all(chunk.map(callbackFn));

    results.push(...chunkResults);
  }

  return results;
}
