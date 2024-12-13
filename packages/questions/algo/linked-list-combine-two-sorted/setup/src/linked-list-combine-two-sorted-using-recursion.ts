interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function linkedListCombineTwoSorted(
  listA: ListNode | null,
  listB: ListNode | null,
): ListNode | null {
  // If listA is null, return listB because the combined list is just listB
  if (listA === null) {
    return listB;
  }

  // If listB is null, return listA because the combined list is just listA
  if (listB === null) {
    return listA;
  }

  // If listA's value is less than listB's value
  if (listA.val < listB.val) {
    // Recursively combine listA.next and listB, and set the next of listA to the combined list
    listA.next = linkedListCombineTwoSorted(listA.next, listB);
    // Return listA as the head of the combined list
    return listA;
  }

  // If listB's value is less than or equal to listA's value
  // Recursively combine listA and listB.next, and set the next of listB to the combined list
  listB.next = linkedListCombineTwoSorted(listA, listB.next);

  // Return listB as the head of the combined list
  return listB;
}
