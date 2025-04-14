export default function size(
  collection:
    | Array<any>
    | Object
    | Map<any, any>
    | Set<any>
    | string
    | null
    | undefined,
): number {
  if (collection == null) {
    return 0;
  }

  if (Array.isArray(collection) || typeof collection === 'string') {
    return collection.length;
  }

  if (collection instanceof Map || collection instanceof Set) {
    return collection.size;
  }

  if (typeof collection === 'object') {
    return Object.keys(collection).length;
  }

  return 0;
}
