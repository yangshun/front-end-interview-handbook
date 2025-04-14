export default function compact<T extends Array<any> | Object>(value: T): T {
  // Handle primitives.
  if (typeof value !== 'object' || value == null) {
    return value;
  }

  // Handle arrays.
  if (Array.isArray(value)) {
    const compactArr: Array<any> = [];
    value.forEach((item) => {
      if (item) {
        compactArr.push(compact(item));
      }
    });

    return compactArr as T;
  }

  // Lastly handle objects.
  const compactObj = Object.create(null);
  Object.entries(value).forEach(([key, val]) => {
    if (val) {
      compactObj[key] = compact(val);
    }
  });

  return compactObj;
}
