import cycle from './cycle';

describe('cycle', () => {
  test('returns function', () => {
    const fooFn = cycle('foo');
    expect(fooFn).toBeInstanceOf(Function);
  });

  test('single item', () => {
    const helloFn = cycle('hello');
    expect(helloFn()).toBe('hello');
  });

  test('two values', () => {
    const onOffFn = cycle('on', 'off');
    expect(onOffFn()).toBe('on');
    expect(onOffFn()).toBe('off');
  });

  test('three values', () => {
    const speedFn = cycle('slow', 'medium', 'fast');
    expect(speedFn()).toBe('slow');
    expect(speedFn()).toBe('medium');
    expect(speedFn()).toBe('fast');
  });

  test('wraps around', () => {
    const speedFn = cycle('slow', 'medium', 'fast');
    expect(speedFn()).toBe('slow');
    expect(speedFn()).toBe('medium');
    expect(speedFn()).toBe('fast');
    expect(speedFn()).toBe('slow');
    expect(speedFn()).toBe('medium');
    expect(speedFn()).toBe('fast');
  });
});
