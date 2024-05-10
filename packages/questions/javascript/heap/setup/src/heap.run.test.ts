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

  test('delete', () => {
    const heap = new Heap<number>();
    heap.insert(300);
    heap.insert(100);
    heap.insert(200);
    expect(heap.delete()).toBe(300);
    expect(heap.findMax()).toBe(200);
    expect(heap.delete()).toBe(200);
    expect(heap.findMax()).toBe(100);
    expect(heap.delete()).toBe(100);
    expect(heap.findMax()).toBeUndefined();
  });

  test('heapify', () => {
    const array = [5, 3, 17, 10, 84, 19, 6, 22, 9];
    const heap = new Heap<number>(array);
    expect(heap.findMax()).toBe(84);
  });
});
