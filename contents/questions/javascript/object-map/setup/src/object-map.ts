export default function objectMap<V, R>(
  obj: Record<string, V>,
  fn: (val: V) => R,
): Record<string, R> {
  const result: Record<string, R> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = fn.call(obj, obj[key]);
    }
  }

  return result;
}
