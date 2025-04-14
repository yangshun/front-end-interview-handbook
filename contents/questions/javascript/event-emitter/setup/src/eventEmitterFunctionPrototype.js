export default function EventEmitter() {
  // Avoid creating objects via `{}` to exclude unwanted properties
  // on the prototype (such as `.toString`).
  this._events = Object.create(null);
}

/**
 * @param {string} eventName
 * @param {Function} listener
 * @returns {EventEmitter}
 */
EventEmitter.prototype.on = function (eventName, listener) {
  if (!Object.hasOwn(this._events, eventName)) {
    this._events[eventName] = [];
  }

  this._events[eventName].push(listener);
  return this;
};

/**
 * @param {string} eventName
 * @param {Function} listener
 * @returns {EventEmitter}
 */
EventEmitter.prototype.off = function (eventName, listener) {
  // Ignore non-existing eventNames.
  if (!Object.hasOwn(this._events, eventName)) {
    return this;
  }

  const listeners = this._events[eventName];

  // Find only first instance of the listener.
  const index = listeners.findIndex(
    (listenerItem) => listenerItem === listener,
  );

  if (index < 0) {
    return this;
  }

  this._events[eventName].splice(index, 1);
  return this;
};

/**
 * @param {string} eventName
 * @param  {...any} args
 * @returns {boolean}
 */
EventEmitter.prototype.emit = function (eventName, ...args) {
  // Return false for non-existing eventNames or events without listeners.
  if (
    !Object.hasOwn(this._events, eventName) ||
    this._events[eventName].length === 0
  ) {
    return false;
  }

  // Make a clone of the listeners in case one of the listeners
  // mutates this listener array.
  const listeners = this._events[eventName].slice();
  listeners.forEach((listener) => {
    listener.apply(null, args);
  });

  return true;
};
