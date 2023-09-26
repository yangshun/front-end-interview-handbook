import listFormat from './list-format';

describe('listFormat', () => {
  test('empty', () => {
    expect(listFormat([])).toEqual('');
  });

  test('one item', () => {
    expect(listFormat(['Bob'])).toEqual('Bob');
    expect(listFormat(['Bob'], { length: 2 })).toEqual('Bob');
  });

  test('two items', () => {
    expect(listFormat(['Bob', 'Alice'])).toEqual('Bob and Alice');
  });

  test('many items', () => {
    expect(listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'])).toEqual(
      'Bob, Ben, Tim, Jane and John',
    );
  });
});
