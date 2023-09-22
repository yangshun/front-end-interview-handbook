import limit from './limit';

describe('limit', () => {
  test('returns function', () => {
    const limited = limit(() => {}, 1);
    expect(limited).toBeInstanceOf(Function);
  });

  test('once', () => {
    let i = 0;
    const limited = limit(() => ++i, 1);

    limited();
    limited();
    expect(i).toBe(1);
  });

  test('twice', () => {
    let i = 0;
    const limited = limit(() => ++i, 2);

    limited();
    expect(i).toBe(1);
    limited();
    expect(i).toBe(2);
    limited();
    expect(i).toBe(2);
    limited();
    expect(i).toBe(2);
  });
});
