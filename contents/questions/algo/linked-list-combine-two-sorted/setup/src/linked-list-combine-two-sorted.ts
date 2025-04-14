interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function linkedListCombineTwoSorted(
  listA: ListNode | null,
  listB: ListNode | null,
): ListNode | null {
  // Dummy node to act as the previous node to the head of the combined list
  let dummy: ListNode = { val: -1, next: null };

  // Pointer to the last node in the combined list, initially set to dummy
  let prev: ListNode = dummy;

  // Iterate while both listA and listB are not null
  while (listA !== null && listB !== null) {
    // Compare the values of listA and listB nodes
    if (listA.val <= listB.val) {
      // If listA node is smaller or equal, add it to the combined list
      prev.next = listA;
      listA = listA.next; // Move to the next node in listA
    } else {
      // If listB node is smaller, add it to the combined list
      prev.next = listB;
      listB = listB.next; // Move to the next node in listB
    }
    // Move prev to the next node in the combined list
    prev = prev.next!;
  }

  // At least one of listA and listB can still have nodes, add the remaining nodes to the combined list
  if (listA !== null) {
    prev.next = listA;
  } else {
    prev.next = listB;
  }

  // The combined list is next to the dummy node
  return dummy.next;
}
