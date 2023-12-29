export default function difference(array, values) {
  const valuesSet = new Set(values);
  return array.filter((value) => !valuesSet.has(value));
}
