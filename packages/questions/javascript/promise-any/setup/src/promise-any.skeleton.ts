export default function promiseAny<T extends readonly unknown[] | []>(
  iterable: T,
): Promise<Awaited<T[number]>> {
  throw 'Not implemented!';
}
