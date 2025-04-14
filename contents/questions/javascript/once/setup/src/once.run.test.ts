import once from './once';

describe('once', () => {
  test('returns function', () => {
    const onced = once(() => {});
    expect(onced).toBeInstanceOf(Function);
  });

  test('only run once', () => {
    let i = 0;
    const onced = once(() => ++i);

    onced();
    onced();
    expect(i).toBe(1);
  });

  test('returns the value of the first invocation', () => {
    let i = 0;
    const onced = once(() => ++i);
    expect(onced()).toBe(1);
    expect(onced()).toBe(1);
    expect(i).toBe(1);

    i = 99;
    expect(onced()).toBe(1);
    expect(i).toBe(99);
  });
});
