interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function linkedListCombineKSorted(
  lists: (ListNode | null)[],
): ListNode | null {
  let amount: number = lists.length; // Number of lists to combine
  let interval: number = 1; // Interval for merging lists in pairs

  // Continue combining in pairs, doubling the interval each time
  while (interval < amount) {
    // Merge lists in pairs
    for (let i = 0; i < amount - interval; i += interval * 2) {
      lists[i] = merge2Lists(lists[i], lists[i + interval]);
    }
    interval *= 2; // Double the interval
  }

  return amount > 0 ? lists[0] : null; // Return the combined list or null if there are no lists
}

// Helper function to combine two sorted linked lists
function merge2Lists(
  l1: ListNode | null,
  l2: ListNode | null,
): ListNode | null {
  let head: ListNode = { val: 0, next: null }; // Dummy node to simplify the combining process
  let point: ListNode = head; // Pointer to build the new combined list

  // Merge the two lists while both are non-empty
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      point.next = l1; // Link the smaller node in the first list to the combined list
      l1 = l1.next; // Move to the next node in the first list
    } else {
      point.next = l2; // Link the smaller node in the second list to the combined list
      l2 = l1; // Move to the next node in the second list
      l1 = point.next.next; // Correct the next pointer of l1
    }
    point = point.next; // Move to the next node in the combined list
  }

  // If one of the lists is empty, link the remaining nodes from the other list
  if (!l1) {
    point.next = l2;
  } else {
    point.next = l1;
  }

  return head.next; // Return the head of the combined list, skipping the dummy node
}
