/**
 * @param {Object} objectParam
 * @param {string|Array<string>} pathParam
 * @param {*} [defaultValue]
 * @return {*}
 */
export default function get(objectParam, pathParam, defaultValue) {
  // If the path is a `.` seperated string, use split to convert it to an array.
  const path = Array.isArray(pathParam) ? pathParam : pathParam.split('.');

  let index = 0;
  let length = path.length;
  let object = objectParam;

  // Traverse path in the object, stopping early if a value is null/undefined.
  while (object != null && index < length) {
    // We use != null instead of !== null to handle undefined objects too
    // Access next level in the object using string key (handles numeric indices too).
    object = object[String(path[index])];
    index++;
  }

  // Check if the entire path was successfully traversed. If not, the path is invalid.
  const value = index && index === length ? object : undefined;

  // Return the found value, or the default if the value resolved to undefined.
  return value !== undefined ? value : defaultValue;
}
