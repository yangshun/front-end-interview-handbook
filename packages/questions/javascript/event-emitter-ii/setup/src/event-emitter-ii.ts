interface IEventEmitter {
  on(eventName: string, listener: Function): { off: () => void };
  emit(eventName: string, ...args: any[]): void;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
export default class EventEmitter implements IEventEmitter {
  _key: number;
  _events: Record<string, Record<string, Function>>;

  constructor() {
    // Creating objects via {} will include unwanted properties
    // on the prototype (such as `.toString`).
    this._events = Object.create(null);
    // Use an incrementing number to uniquely identify each listener.
    this._key = 0;
  }

  on(eventName: string, listener: Function): { off: () => void } {
    if (!(eventName in this._events)) {
      this._events[eventName] = {};
    }

    const listenerId = this._key;
    this._events[eventName][listenerId] = listener;
    this._key++;

    return {
      // Use arrow function so that `this` is preserved.
      off: () => {
        delete this._events[eventName][listenerId];
      },
    };
  }

  emit(eventName: string, ...args: any[]): void {
    // Early return for non-existing eventNames or
    // events without listeners.
    if (
      !(eventName in this._events) ||
      Object.keys(this._events[eventName]).length === 0
    ) {
      return;
    }

    // Make a clone of the listeners in case one of the
    // listeners calls sub.off() and changes the listeners.
    const listeners = { ...this._events[eventName] };
    Object.values(listeners).forEach((listener) => {
      listener.apply(null, args);
    });
  }
}
