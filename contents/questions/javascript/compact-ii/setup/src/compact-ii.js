/**
 * @param {Array|Object} value
 * @return {Array|Object}
 */
export default function compact(value) {
  // Handle primitives.
  if (typeof value !== 'object' || value == null) {
    return value;
  }

  // Handle arrays.
  if (Array.isArray(value)) {
    const compactArr = [];
    value.forEach((item) => {
      if (item) {
        compactArr.push(compact(item));
      }
    });

    return compactArr;
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
