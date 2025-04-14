interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter;
  off(eventName: string, listener: Function): IEventEmitter;
  emit(eventName: string, ...args: Array<any>): boolean;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export has the same interface.
export default class EventEmitter implements IEventEmitter {
  constructor() {
    throw 'Not implemented!';
  }

  on(eventName: string, listener: Function): IEventEmitter {
    throw 'Not implemented!';
  }

  off(eventName: string, listener: Function): IEventEmitter {
    throw 'Not implemented!';
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    throw 'Not implemented!';
  }
}
