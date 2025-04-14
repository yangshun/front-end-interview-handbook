export default function conformsTo<T>(
  object: Record<string, T>,
  source: Record<string, (value: T) => boolean>,
): boolean {
  throw 'Not implemented!';
}
