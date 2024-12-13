export default function isBalancedBrackets(str: string): boolean {
  // Define a mapping from closing parentheses to their corresponding opening parentheses
  const mappings: { [key: string]: string } = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  // Initialize an empty stack to keep track of opening parentheses
  const stack: string[] = [];

  // Iterate through each character in the string
  for (let c of str) {
    // If the current character is a closing parenthesis
    if (mappings[c]) {
      // Pop the top element from the stack (or use '#' if the stack is empty)
      const topElement = stack.length ? stack.pop() : '#';

      // If the popped element does not match the corresponding opening parenthesis, return false
      if (topElement !== mappings[c]) {
        return false;
      }
    } else {
      // If the current character is an opening parenthesis, push it onto the stack
      stack.push(c);
    }
  }

  // After processing all characters, the stack should be empty for the string to be valid
  return stack.length === 0;
}
