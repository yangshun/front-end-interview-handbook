export default function without(array, ...values) {
  return array.filter((value) => !values.includes(value));
}
