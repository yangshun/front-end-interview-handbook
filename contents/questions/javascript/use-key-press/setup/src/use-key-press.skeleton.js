/**
 * @callback callback
 * @param {KeyboardEvent} e
 */

/**
 * @typedef {Object} UseKeyPressOptions
 * @property {'keyup' | 'keydown'} event
 * @property {EventTarget} target
 */

/**
 * @param {string} key
 * @param {callback} callback
 * @param {UseKeyPressOptions} options
 */
export default function useKeyPress(
  key,
  callback,
  { event = 'keydown', target = window } = {
    event: 'keydown',
    target: window,
  },
) {
  throw 'Not implemented';
}
