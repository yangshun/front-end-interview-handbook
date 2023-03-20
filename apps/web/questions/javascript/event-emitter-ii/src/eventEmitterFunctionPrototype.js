export default function EventEmitter() {
  // Creating objects via {} will include unwanted properties
  // on the prototype (such as `.toString`).
  this.events = Object.create(null);
  // Use an incrementing number to unique identify each listener.
  this._key = 0;
}

EventEmitter.prototype.on = function (eventName, listener) {
  if (!(eventName in this.events)) {
    this.events[eventName] = {};
  }

  const indexForListener = this._key;
  this.events[eventName][indexForListener] = listener;
  this._key++;

  return {
    // Use arrow function so that `this` is preserved.
    off: () => {
      delete this.events[eventName][indexForListener];
    },
  };
};

EventEmitter.prototype.emit = function (eventName, ...args) {
  // Early return for non-existing eventNames or events without listeners.
  if (
    !(eventName in this.events) ||
    Object.keys(this.events[eventName]).length === 0
  ) {
    return;
  }

  // Make a clone of the listeners in case one of the listeners
  // calls sub.off() and changes the listeners.
  const listeners = { ...this.events[eventName] };
  Object.values(listeners).forEach((listener) => {
    listener.apply(null, args);
  });
};
