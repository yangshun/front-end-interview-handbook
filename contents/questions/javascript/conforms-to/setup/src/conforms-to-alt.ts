export default function conformsTo<T>(
  object: Record<string, T>,
  source: Record<string, (value: T) => boolean>,
): boolean {
  // .every() ensures that all predicate must return `true` for `conformsTo` to return `true`.
  return Object.keys(source).every((key) => {
    return (
      Object.hasOwn(source, key) &&
      Object.hasOwn(object, key) &&
      source[key](object[key])
    );
  });
}
