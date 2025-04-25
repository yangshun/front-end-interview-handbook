import LinkedList from './linked-list';

describe('LinkedList', () => {
  test('constructor', () => {
    const list = new LinkedList();
    expect(list).toBeInstanceOf(LinkedList);
  });

  test('insert()', () => {
    const list = new LinkedList();
    list.insertHead(100);
    list.insertTail(200);
    list.insertHead(300);

    expect(list.length()).toEqual(3);
    expect(list.toArray()).toEqual([300, 100, 200]);
  });

  test('remove()', () => {
    const list = new LinkedList();
    list.insertHead(100);
    list.insertTail(200);
    expect(list.remove(1)).toBe(200);
    expect(list.remove(1)).toBe(undefined);
    expect(list.length()).toEqual(1);
  });
});
