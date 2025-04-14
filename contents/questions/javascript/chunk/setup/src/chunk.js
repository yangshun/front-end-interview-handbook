/**
 * @template T
 * @param {Array<T>} array The array to process.
 * @param {number} [size=1] The length of each chunk.
 * @returns {Array<Array<T>>} The new array of chunks.
 */
export default function chunk(array, size = 1) {
  if (!Array.isArray(array) || size < 1) {
    return [];
  }

  const result = [];

  for (let i = 0; i < array.length; i += size) {
    const chunk = array.slice(i, i + size);
    result.push(chunk);
  }

  return result;
}
