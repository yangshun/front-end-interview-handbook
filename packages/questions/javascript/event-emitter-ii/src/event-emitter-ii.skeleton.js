// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
export default class EventEmitter {
  constructor() {
    throw 'Not implemented!';
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter & {off: Function}}}
   */
  on(eventName, listener) {
    throw 'Not implemented!';
  }

  /**
   * @param {string} eventName
   * @param {...any} args
   */
  emit(eventName, ...args) {
    throw 'Not implemented!';
  }
}
