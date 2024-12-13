interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function rearrangeLinkedList(head: ListNode | null): void {
  if (head === null) {
    return;
  }

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  // Locate the middle node of the linked list
  // For example, in the list 1->2->3->4->5->6, the middle is 4
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // Reverse the second half of the list
  // Transform 1->2->3->4->5->6 into 1->2->3->4 and 6->5->4 (reversed in-place)
  let prev: ListNode | null = null;
  let curr: ListNode | null = slow;
  while (curr !== null) {
    const tmp: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = tmp;
  }

  // Merge the two halves of the list
  // Combine 1->2->3->4 and 6->5->4 into 1->6->2->5->3->4
  let first: ListNode | null = head;
  let second: ListNode | null = prev;
  while (second !== null && second.next !== null) {
    const tmp1: ListNode | null = first!.next;
    first!.next = second;
    first = tmp1;

    const tmp2: ListNode | null = second.next;
    second.next = first;
    second = tmp2;
  }
}
