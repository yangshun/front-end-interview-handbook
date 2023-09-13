/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
  return JSON.parse('[' + JSON.stringify(value).replace(/(\[|\])/g, '') + ']');
}
