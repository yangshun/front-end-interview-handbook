interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function deleteNthNodeFromEnd(
  head: ListNode | null,
  n: number,
): ListNode | null {
  // Create a dummy node that points to the head of the list
  let dummy: ListNode = { val: 0, next: head };

  // Initialize a variable to keep track of the length of the list
  let length: number = 0;
  let first: ListNode | null = head;

  // Traverse the list to calculate its length
  while (first !== null) {
    length++;
    first = first.next;
  }

  // Calculate the position of the node just before the node to be removed
  length -= n;
  first = dummy;

  // Traverse to the node just before the node to be removed
  while (length > 0) {
    length--;
    first = first.next!;
  }

  // Remove the nth node from the end
  first.next = first.next!.next;

  // Return the modified list, starting from the node after the dummy
  return dummy.next;
}
