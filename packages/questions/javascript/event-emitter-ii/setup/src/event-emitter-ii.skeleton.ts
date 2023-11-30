interface IEventEmitter {
  on(eventName: string, listener: Function): { off: () => void };
  emit(eventName: string, ...args: Array<any>): boolean;
}

// You are free to use alternative approaches of
// instantiating the EventEmitter as long as the
// default export is correct.
export default class EventEmitter implements IEventEmitter {
  constructor() {
    throw 'Not implemented!';
  }

  on(eventName: string, listener: Function): { off: () => void } {
    throw 'Not implemented!';
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    throw 'Not implemented!';
  }
}
