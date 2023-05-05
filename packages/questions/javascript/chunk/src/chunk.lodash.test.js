import { chunk } from 'lodash';

/* eslint-disable no-undef */
describe('chunk', () => {
  test('splits an array into chunks of the given size', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 'A', 'B', 'C'];
    const size = 3;
    const expectedOutput = [[1, 2, 3], [4, 5, 6], [7, 'A', 'B'], ['C']];
    const output = chunk(input, size);
    expect(output).toEqual(expectedOutput);
  });

  test('handles an empty array', () => {
    const input = [];
    const size = 3;
    const expectedOutput = [];
    const output = chunk(input, size);
    expect(output).toEqual(expectedOutput);
  });

  test('handles default size', () => {
    const input = ['A', 'B', 'C'];
    const expectedOutput = [['A'], ['B'], ['C']];
    const output = chunk(input);
    expect(output).toEqual(expectedOutput);
  });

  test('handles a size larger than the array length', () => {
    const input = [1, 2, 3];
    const size = 5;
    const expectedOutput = [[1, 2, 3]];
    const output = chunk(input, size);
    expect(output).toEqual(expectedOutput);
  });

  test('returns a shallow copy of the input array', () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const size = 3;
    const output = chunk(input, size);
    output[0][0] = 100;
    expect(input[0]).toEqual(1);
  });
});
