interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter;
  off(eventName: string, listener: Function): IEventEmitter;
  emit(eventName: string, ...args: Array<any>): boolean;
}

export default class EventEmitter implements IEventEmitter {
  events: Record<string, Array<Function>>;

  constructor() {
    // Creating objects via {} will include unwanted properties
    // on the prototype (such as `.toString`).
    this.events = Object.create(null);
  }

  on(eventName: string, listener: Function) {
    if (!(eventName in this.events)) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
    return this;
  }

  off(eventName: string, listener: Function) {
    // Ignore non-existing eventNames.
    if (!(eventName in this.events)) {
      return this;
    }

    const listeners = this.events[eventName];

    // Find only first instance of the listener.
    const index = listeners.findIndex(
      (listenerItem) => listenerItem === listener,
    );
    if (index < 0) {
      return this;
    }

    this.events[eventName].splice(index, 1);
    return this;
  }

  emit(eventName: string, ...args: Array<any>) {
    // Return false for non-existing eventNames or events without listeners.
    if (!(eventName in this.events) || this.events[eventName].length === 0) {
      return false;
    }

    // Make a clone of the listeners in case one of the listeners
    // mutates this listener array.
    const listeners = this.events[eventName].slice();
    listeners.forEach((listener) => {
      listener.apply(null, args);
    });

    return true;
  }
}
