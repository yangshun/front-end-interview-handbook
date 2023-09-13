export default function promiseRace<T extends readonly unknown[] | []>(
  iterable: T,
): Promise<Awaited<T[number]>> {
  throw 'Not implemented!';
}
