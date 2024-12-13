interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function linkedListDetectCycle(head: ListNode | null): boolean {
  // Create a Set to track nodes that have been visited
  const nodesSeen = new Set<ListNode>();
  // Start with the head of the linked list
  let current = head;

  // Traverse the linked list
  while (current !== null) {
    // If the current node has been seen before, a cycle is present
    if (nodesSeen.has(current)) {
      return true;
    }

    // Add the current node to the Set of seen nodes
    nodesSeen.add(current);

    // Move to the next node in the linked list
    current = current.next;
  }

  // If the end of the list is reached without finding a cycle, return false
  return false;
}
