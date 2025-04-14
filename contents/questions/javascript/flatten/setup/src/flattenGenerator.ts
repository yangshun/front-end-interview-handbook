/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function* flatten(value: Array<any>): Array<any> {
  for (const item of value) {
    if (Array.isArray(item)) {
      yield* flatten(item);
    } else {
      yield item;
    }
  }
}
