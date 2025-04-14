export default function difference(array, values) {
  return array.filter((value) => !values.includes(value));
}
