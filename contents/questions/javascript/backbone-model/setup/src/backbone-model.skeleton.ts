type EventName = 'change' | 'unset';

interface IBackboneModel {
  get(attribute: string): unknown | undefined;
  set(attribute: string, value: unknown): void;
  has(attribute: string): boolean;
  unset(attribute: string): void;
  on(
    eventName: EventName,
    attribute: string,
    callback: Function,
    context?: any,
  ): void;
  off(event: EventName, attribute: string, callback: Function): void;
}

// You are free to use alternative approaches of
// defining BackboneModel as long as the
// default export can be instantiated.
export default class BackboneModel implements IBackboneModel {
  constructor(initialValues: Record<string, unknown> = {}) {
    throw 'Not implemented!';
  }

  get(attribute: string): unknown | undefined {
    throw 'Not implemented!';
  }

  set(attribute: string, value: unknown): void {
    throw 'Not implemented!';
  }

  has(attribute: string): boolean {
    throw 'Not implemented!';
  }

  unset(attribute: string): void {
    throw 'Not implemented!';
  }

  on(
    eventName: EventName,
    attribute: string,
    callback: Function,
    context?: any,
  ): void {
    throw 'Not implemented!';
  }

  off(eventName: EventName, attribute: string, callback: Function): void {
    throw 'Not implemented!';
  }
}
