import linkedListCombineTwoSorted from './linked-list-combine-two-sorted';
import submitTestCases from './submit.tests.json';

interface ListNode {
  val: number;
  next: ListNode | null;
}

function vectorToLinkedList(values: number[]): ListNode | null {
  if (values.length === 0) {
    return null; // Return null for an empty array
  }

  // Create the head node of the linked list
  const head: ListNode = { val: values[0], next: null };
  let current: ListNode = head;

  // Iterate over the array to create the rest of the linked list
  for (let i = 1; i < values.length; i++) {
    current.next = { val: values[i], next: null };
    current = current.next;
  }

  return head;
}

function linkedListToVector(head: ListNode | null): number[] {
  const result: number[] = [];
  let current: ListNode | null = head;

  // Traverse the linked list and add node values to the array
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

describe('linkedListCombineTwoSorted', () => {
  (submitTestCases as any[]).forEach((example: any) => {
    test(`listA = [${example.input[0][1]}] listB = [${example.input[1][1]}]`, () => {
      expect(
        linkedListToVector(
          linkedListCombineTwoSorted(
            vectorToLinkedList(example.input[0][1]),
            vectorToLinkedList(example.input[1][1]),
          ),
        ),
      ).toStrictEqual(example.output);
    });
  });
});
