/**
 * @param {*} reason
 * @returns Promise
 */
export default function promiseReject(reason) {
  return new Promise((_, reject) => reject(reason));
}
