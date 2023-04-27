import compact from './compact';

/* eslint-disable no-undef */
describe('compact', () => {
  it('should remove all falsey values from the input array', () => {
    const input = [0, 1, false, 2, '', 3];
    const output = compact(input);
    expect(output).toEqual([1, 2, 3]);
  });

  it('should handle arrays with only falsey values', () => {
    const input = [null, undefined, NaN, 0, false, '', ''];
    const output = compact(input);
    expect(output).toEqual([]);
  });

  it('should handle arrays with no falsey values', () => {
    const input = ['hello', true, 123, [], {}, function () {}];
    const output = compact(input);
    expect(output).toEqual(input);
  });

  it('should handle empty arrays', () => {
    const input = [];
    const output = compact(input);
    expect(output).toEqual([]);
  });

  it('should not modify the original input array', () => {
    const input = [0, 1, false, 2, '', 3];
    compact(input);
    expect(input).toEqual([0, 1, false, 2, '', 3]);
  });

  it('should handle arrays with holes', () => {
    const input = [1, , 2, , 3];
    const output = compact(input);
    expect(output).toEqual([1, 2, 3]);
  });

  it('should handle sparse arrays', () => {
    const input = new Array(3);
    input[1] = 'hello';
    const output = compact(input);
    expect(output).toEqual(['hello']);
  });
});
