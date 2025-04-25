import LinkedList from './linked-list';

describe('LinkedList', () => {
  test('constructor', () => {
    const list = new LinkedList();
    expect(list).toBeInstanceOf(LinkedList);
  });

  describe('insert', () => {
    test('insertHead()', () => {
      const list = new LinkedList();
      list.insertHead(200);
      list.insertHead(100);
      expect(list.toArray()).toEqual([100, 200]);
    });
  
    test('insertTail()', () => {
      const list = new LinkedList();
      list.insertTail(100);
      list.insertTail(150);
      list.insertTail(200);
      expect(list.toArray()).toEqual([100, 150, 200]);
    });
  });

  describe('get()', () => {
    test('returns correct value at valid index', () => {
      const list = new LinkedList();
      list.insertTail(10);
      list.insertTail(20);
      expect(list.get(0)).toBe(10);
      expect(list.get(1)).toBe(20);
    });
  
    test('returns undefined for out-of-bounds indexes', () => {
      const list = new LinkedList();
      expect(list.get(0)).toBeUndefined();
      list.insertTail(5);
      expect(list.get(1)).toBeUndefined();
    });
  });

  test('remove()', () => {
    const list = new LinkedList();
    list.insertHead(100);
    list.insertTail(200);
    expect(list.remove(1)).toBe(200);
    expect(list.length()).toEqual(1);
    expect(list.remove(1)).toBe(undefined);
    expect(list.length()).toEqual(1);
  });

  test('remove()', () => {
    const list = new LinkedList();
    expect(list.length()).toEqual(0);
    expect(list.toArray()).toEqual([]);
    list.insertTail(2);
    expect(list.length()).toEqual(1);
    expect(list.toArray()).toEqual([2]);
    list.remove(0);
    expect(list.toArray()).toEqual([]);
    expect(list.length()).toEqual(0);
  });

  test('mixed', () => {
    const linked = new LinkedList();
    expect(linked.toArray()).toEqual([]);
    linked.insertTail(1);
    linked.insertHead(2);
    expect(linked.toArray()).toEqual([2, 1]);
    linked.insertTail(3);
    expect(linked.toArray()).toEqual([2, 1, 3]);
    expect(linked.get(1)).toBe(1);
    expect(linked.get(2)).toBe(3);
    expect(linked.remove(1)).toBe(1);
    expect(linked.toArray()).toEqual([2, 3]);
    expect(linked.remove(1)).toBe(3);
    expect(linked.remove(4)).toBe(undefined);
    expect(linked.remove(0)).toBe(2);
    expect(linked.remove(0)).toBe(undefined);
    expect(linked.toArray()).toEqual([]);
  });
});
