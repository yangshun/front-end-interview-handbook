export default function without(array, ...values) {
  const valuesSet = new Set(values);
  return array.filter((value) => !valuesSet.has(value));
}
