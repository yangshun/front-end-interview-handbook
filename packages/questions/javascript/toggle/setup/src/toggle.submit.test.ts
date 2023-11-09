import toggle from './toggle';

describe('toggle', () => {
  test('returns function', () => {
    const foo = toggle('foo');
    expect(foo).toBeInstanceOf(Function);
  });

  test('single item', () => {
    const hello = toggle('hello');
    expect(hello()).toBe('hello');
  });

  test('two values', () => {
    const onOff = toggle('on', 'off');
    expect(onOff()).toBe('on');
    expect(onOff()).toBe('off');
  });

  test('three values', () => {
    const speed = toggle('slow', 'medium', 'fast');
    expect(speed()).toBe('slow');
    expect(speed()).toBe('medium');
    expect(speed()).toBe('fast');
  });

  test('wraps around', () => {
    const speed = toggle('slow', 'medium', 'fast');
    expect(speed()).toBe('slow');
    expect(speed()).toBe('medium');
    expect(speed()).toBe('fast');
    expect(speed()).toBe('slow');
    expect(speed()).toBe('medium');
    expect(speed()).toBe('fast');
  });
});
