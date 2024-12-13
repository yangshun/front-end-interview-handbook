interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function linkedListDetectCycle(head: ListNode | null): boolean {
  // If the list is empty or has only one node without a cycle, return false
  if (head === null) {
    return false;
  }

  // Initialize two pointers: slow and fast
  // Slow pointer advances by one step at a time
  let slow: ListNode | null = head;
  // Fast pointer advances by two steps at a time
  let fast: ListNode | null = head.next;

  // Traverse the list
  while (fast !== null && fast.next !== null) {
    // Move slow pointer by one step
    if (slow === null) {
      // This check is for TypeScript to satisfy non-null assertions
      return false;
    }
    slow = slow.next;

    // Move fast pointer by two steps
    fast = fast.next.next;

    // If slow and fast pointers meet, a cycle is detected
    if (slow === fast) {
      return true;
    }
  }

  // If fast pointer reaches the end of the list, no cycle exists
  return false;
}
