export default function intersection<T>(...arrays: Array<Array<T>>): Array<T> {
  if (arrays.length === 0) {
    return [];
  }

  const set = new Set<T>(arrays[0]);

  for (let i = 1; i < arrays.length; i++) {
    set.forEach((value) => {
      if (!arrays[i].includes(value)) {
        set.delete(value);
      }
    });
  }

  return Array.from(set);
}
