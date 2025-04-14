export default function squashObject(obj: Object): Object {
  function squashImpl(
    obj_: Object,
    path: Array<string>,
    output: Record<string, any>,
  ) {
    for (const [key, value] of Object.entries(obj_)) {
      if (typeof value !== 'object' || value === null) {
        output[path.concat(key).filter(Boolean).join('.')] = value;
      } else {
        squashImpl(value, path.concat(key), output);
      }
    }
  }

  const out = {};
  squashImpl(obj, [], out);
  return out;
}
