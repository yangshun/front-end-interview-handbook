class Node<T> {
  value: any;
  next: Node<T> | null;

  constructor(value: any, next: Node<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

export default class LinkedList<T> {
  head: Node<T> | null;
  tail: Node<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  /**
   * Adds an item to the head of the linked list.
   * @param {*} value The item to be added to the head of the list.
   */
  insertHead<T>(value: T): void {
    const node = new Node<T>(value, this.head);
    if (this.head == null) {
      this.tail = node;
    }
    this.head = node;
  }

  /**
   * Adds an item to the tail of the linked list.
   * @param {*} value The item to be added to the tail of the list.
   */
  insertTail<T>(value: T): void {
    const node = new Node<T>(value);
    if (this.tail == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
  }

  /**
   * Remove the item in the given index and return its value or `undefined` if index is out of bound.
   * @param {number} i The index of the item to be removed.
   * @return {*} The value of the item in index i if it exists, `undefined` otherwise.
   */
  remove<T>(i: number): T | undefined {
    // To remove index 0, we have to replace the value of head, if it exists.
    if (i === 0 && this.head != null) {
      let value = this.head.value;
      this.head = this.head.next;
      if (this.head == null) {
        this.tail = null;
      } // If there is no node left in the linked list, replace tail with null as well.
      return value;
    }

    let curr: Node<T> | null = this.head; // Set a pointer to the first node of the linked list.
    // Point the pointer to the next node for i-1 times to reach index i-1.
    for (let j = 1; j < i; j++) {
      if (curr == null || curr.next == null) {
        return undefined;
      } // Return `undefined` if linked list ends before reaching index i.

      curr = curr.next; // Change the current pointer to the next one.
    }

    if (curr == null || curr.next == null) {
      return undefined;
    }

    let value = curr.next.value; // Save the value of the node in index i.
    curr.next = curr.next.next;

    // If curr.next, which is to be removed, is the last node in the linked list, update tail to the previous node (curr).
    this.tail = curr.next == null ? curr : this.tail;

    return value; // Return the value of the node in index i.
  }

  /**
   * Return the value of the item in the given index or `undefined` if index is out of bound.
   * @param {number} i The index of the value of the item to be returned.
   * @return {*} The value of the item in index i if it exists, `undefined` otherwise.
   */
  get<T>(i: number): T | undefined {
    let curr: Node<T> | null = this.head; // Set a pointer to the first node of the linked list.
    // Point the pointer to the next node for i times to reach index i.
    for (let j = 0; j < i; j++) {
      if (curr == null) {
        return undefined;
      } // Return `undefined` if linked list ends before reaching index i.

      curr = curr.next;
    }

    let value = curr != null ? curr.value : undefined;
    return value; // Return the value of the node in index i.
  }

  /**
   * Return an array containing all the values of the items in the linked list from head to tail.
   * @return {*} The array of all the values in the linked list from head to tail.
   */
  toArray<T>(): Array<T> {
    const array: Array<T> = [];
    let curr: Node<T> | null = this.head; // Set a pointer to the first node of the linked list.

    // Continue to traverse through the linked list until it reaches the tail (null).
    while (curr != null) {
      array.push(curr.value);
      curr = curr.next; // Change the current pointer to the next one.
    }

    return array;
  }

  /**
   * Return the length / number of elements in the linked list.
   * @return {*} Length of the linked list.
   */
  length(): number {
    let length = 0;
    let curr = this.head;

    while (curr) {
      length += 1;
      curr = curr.next;
    }

    return length;
  }
}
