/**
 * @param {number} duration
 * @return {Promise<any>}
 */
export default async function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
