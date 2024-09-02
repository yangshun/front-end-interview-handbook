import Heap from './heap';

describe('Heap', () => {
  test('constructor', () => {
    const heap = new Heap<number>();
    expect(heap instanceof Heap).toBeTruthy();
  });

  test('insert and findMax', () => {
    const heap = new Heap<number>();
    heap.insert(100);
    expect(heap.findMax()).toBe(100);
    heap.insert(200);
    expect(heap.findMax()).toBe(200);
    heap.insert(50);
    expect(heap.findMax()).toBe(200);
  });

  test('delete functionality', () => {
    const heap = new Heap<number>();
    heap.insert(300);
    heap.insert(100);
    heap.insert(200);
    expect(heap.delete()).toBe(300);
    expect(heap.findMax()).toBe(200);
    expect(heap.delete()).toBe(200);
    expect(heap.findMax()).toBe(100);
    heap.insert(400);
    expect(heap.delete()).toBe(400);
    expect(heap.findMax()).toBe(100);
  });

  test('heapify from array', () => {
    const array = [5, 3, 17, 10, 84, 19, 6, 22, 9];
    const heap = new Heap<number>(array);
    expect(heap.findMax()).toBe(84);
    expect(heap.delete()).toBe(84);
    expect(heap.findMax()).toBe(22);
  });

  test('complex insert and delete sequence', () => {
    const heap = new Heap<number>();
    heap.insert(20);
    heap.insert(15);
    heap.insert(30);
    heap.insert(10);
    expect(heap.findMax()).toBe(30);
    expect(heap.delete()).toBe(30);
    expect(heap.findMax()).toBe(20);
    heap.insert(35);
    heap.insert(45);
    expect(heap.delete()).toBe(45);
    expect(heap.findMax()).toBe(35);
  });

  test('delete on empty heap', () => {
    const heap = new Heap<number>();
    expect(heap.delete()).toBeUndefined();
  });

  test('maintaining state after multiple operations', () => {
    const heap = new Heap<number>();
    heap.insert(50);
    heap.insert(30);
    heap.insert(60);
    expect(heap.delete()).toBe(60);
    heap.insert(55);
    heap.insert(65);
    expect(heap.findMax()).toBe(65);
    expect(heap.delete()).toBe(65);
    expect(heap.findMax()).toBe(55);
  });

  test('integration test of operations', () => {
    const heap = new Heap<number>();
    heap.insert(5);
    heap.insert(3);
    heap.insert(17);
    heap.insert(10);
    heap.insert(84);
    heap.insert(19);
    heap.insert(6);
    heap.insert(22);
    heap.insert(9);
    expect(heap.delete()).toBe(84);
    expect(heap.findMax()).toBe(22);
    heap.insert(55);
    expect(heap.findMax()).toBe(55);
    expect(heap.delete()).toBe(55);
    expect(heap.findMax()).toBe(22);
  });
});
