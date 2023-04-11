interface IEventEmitter {
  on(eventName: string, listener: Function): IEventEmitter & { off: Function };
  emit(eventName: string, ...args: any[]): void;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
export default class EventEmitter implements IEventEmitter {
  constructor() {
    throw 'Not implemented!';
  }

  on(eventName: string, listener: Function): EventEmitter & { off: Function } {
    throw 'Not implemented!';
  }

  emit(eventName: string, ...args: any[]) {
    throw 'Not implemented!';
  }
}
