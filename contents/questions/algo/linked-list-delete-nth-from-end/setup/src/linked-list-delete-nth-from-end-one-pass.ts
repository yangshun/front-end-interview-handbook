interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function removeNthFromEnd(
  head: ListNode | null,
  n: number,
): ListNode | null {
  // Create a dummy node that points to the head of the list
  const dummy: ListNode = { val: 0, next: head };

  // Initialize two pointers, both starting at the dummy node
  let first: ListNode | null = dummy;
  let second: ListNode | null = dummy;

  // Advance the first pointer so that there is a gap of n nodes between the first and second pointers
  for (let i = 0; i <= n; i++) {
    if (first !== null) {
      first = first.next;
    }
  }

  // Move both pointers until the first pointer reaches the end of the list
  // This maintains the gap between the two pointers
  while (first !== null) {
    first = first.next;
    second = second!.next;
  }

  // Remove the nth node from the end by skipping the node after the second pointer
  if (second !== null && second.next !== null) {
    second.next = second.next.next;
  }

  // Return the head of the modified list, which is the node after the dummy node
  return dummy.next;
}
