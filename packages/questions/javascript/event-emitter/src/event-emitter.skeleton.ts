// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
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

  emit(eventName: string, ...args: any[]): boolean {
    throw 'Not implemented!';
  }
}

interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter;
  off(eventName: string, listener: Function): IEventEmitter;
  emit(eventName: string, ...args: any[]): boolean;
}
