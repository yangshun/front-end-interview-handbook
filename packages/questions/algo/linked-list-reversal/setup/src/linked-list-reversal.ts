interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function reverseLinkedList(
  head: ListNode | null,
): ListNode | null {
  // Initialize pointers
  let prev: ListNode | null = null; // Previous node, initially null
  let curr: ListNode | null = head; // Current node, starts with head

  // Iterate over the linked list
  while (curr !== null) {
    // Temporarily store the next node
    const nextTemp: ListNode | null = curr.next;

    // Reverse the current node's pointer
    curr.next = prev;

    // Move prev and curr one step forward
    prev = curr;
    curr = nextTemp;
  }

  // Return the new head of the reversed list
  return prev;
}
