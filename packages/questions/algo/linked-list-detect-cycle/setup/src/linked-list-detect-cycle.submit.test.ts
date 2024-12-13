import linkedListDetectCycle from './linked-list-detect-cycle';
import submitTestCases from './submit.tests.json';

interface ListNode {
  val: number;
  next: ListNode | null;
}

function addCycle(head: ListNode | null, pos: number): void {
  let posNode: ListNode | null = null;
  let lastNode: ListNode | null = null;
  let counter = 0;
  let current = head;

  while (current !== null) {
    if (counter === pos) {
      posNode = current; // Node at the position to create a cycle
    }
    if (current.next === null) {
      lastNode = current; // Last node of the list
    }
    current = current.next;
    counter++;
  }

  if (lastNode !== null && posNode !== null) {
    lastNode.next = posNode; // Create a cycle
  }
}

function vectorToLinkedList(values: number[], pos: number): ListNode | null {
  if (values.length === 0) {
    return null; // Return null for an empty array
  }

  // Create the head node of the linked list
  const head: ListNode = { val: values[0], next: null };
  let current = head;

  // Iterate over the array to create the rest of the linked list
  for (let i = 1; i < values.length; i++) {
    current.next = { val: values[i], next: null };
    current = current.next;
  }

  // Add a cycle if pos is not -1
  if (pos !== -1) {
    addCycle(head, pos);
  }

  return head;
}

describe('linkedListDetectCycle', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`list = [${example.input[0][1]}] pos = ${example.input[1][1]}`, () => {
      expect(
        linkedListDetectCycle(
          vectorToLinkedList(example.input[0][1], example.input[1][1]),
        ),
      ).toStrictEqual(example.output);
    });
  });
});
