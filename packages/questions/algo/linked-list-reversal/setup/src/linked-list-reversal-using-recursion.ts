interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function reverseLinkedList(
  head: ListNode | null,
): ListNode | null {
  // Base case: if the list is empty or has only one node, return the head
  if (head === null || head.next === null) {
    return head;
  }

  // Recursive case: reverse the rest of the list
  const p: ListNode | null = reverseLinkedList(head.next);

  // Set the next node's next reference to the current node
  head.next.next = head;

  // Set the current node's next reference to null
  head.next = null;

  // Return the new head of the reversed list
  return p;
}
