interface ListNode {
  val: number;
  next: ListNode | null;
}

export default function linkedListCombineKSorted(
  lists: (ListNode | null)[],
): ListNode | null {
  // Array to hold all node values from the linked lists
  let nodes: number[] = [];

  // Create a dummy node to serve as the starting point for the combined list
  let dummy: ListNode = { val: 0, next: null };
  let combinedHead: ListNode = dummy; // Head node to build the new combined list

  // Traverse each linked list in the input array
  lists.forEach((l) => {
    // Traverse the current linked list
    while (l) {
      // Collect all node values in the array
      nodes.push(l.val);
      l = l.next; // Move to the next node in the current list
    }
  });

  // Sort the collected node values in ascending order
  nodes
    .sort((a, b) => a - b)
    .forEach((n) => {
      // Create a new node with the sorted value and link it to the combined list
      combinedHead.next = { val: n, next: null };
      combinedHead = combinedHead.next; // Move the pointer to the newly added node
    });

  // Return the combined list, skipping the dummy node
  return dummy.next;
}
