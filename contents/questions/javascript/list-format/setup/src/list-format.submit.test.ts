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

  test('duplicate items', () => {
    expect(listFormat(['Bob', 'Ben', 'Bob', 'Ben', 'John'])).toEqual(
      'Bob, Ben, Bob, Ben and John',
    );
    expect(
      listFormat(['Bob', 'Ben', 'Bob', 'Ben', 'John'], { sorted: true }),
    ).toEqual('Ben, Ben, Bob, Bob and John');
  });

  test('length specified', () => {
    expect(
      listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: 3 }),
    ).toEqual('Bob, Ben, Tim and 2 others');
    expect(
      listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: 4 }),
    ).toEqual('Bob, Ben, Tim, Jane and 1 other');
    expect(
      listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: 100 }),
    ).toEqual('Bob, Ben, Tim, Jane and John');
    expect(
      listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: 0 }),
    ).toEqual('Bob, Ben, Tim, Jane and John');
    expect(
      listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], { length: -1 }),
    ).toEqual('Bob, Ben, Tim, Jane and John');
  });

  test('sorted items', () => {
    expect(
      listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
        length: 3,
        sorted: true,
      }),
    ).toEqual('Ben, Bob, Jane and 2 others');
    expect(
      listFormat(['Bob', 'Ben', 'Bob', 'Ben', 'John'], {
        length: 3,
        sorted: true,
      }),
    ).toEqual('Ben, Ben, Bob and 2 others');
  });

  test('unique items', () => {
    expect(
      listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John', 'Bob'], {
        length: 3,
        unique: true,
      }),
    ).toEqual('Bob, Ben, Tim and 2 others');
  });

  test('missing items', () => {
    expect(listFormat(['Bob', 'Ben', '', '', 'John'])).toEqual(
      'Bob, Ben and John',
    );
    expect(listFormat(['Bob', ''])).toEqual('Bob');
    expect(listFormat(['', ''])).toEqual('');
  });

  test('all the options', () => {
    expect(
      listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
        length: 3,
        unique: true,
        sorted: true,
      }),
    ).toEqual('Ben, Bob, Jane and 2 others');
  });
});
