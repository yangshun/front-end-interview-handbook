export default function isStringPalindrome(str: string): boolean {
  let i = 0; // Initialize the left pointer
  let j = str.length - 1; // Initialize the right pointer

  // Loop until the left pointer is less than the right pointer
  while (i < j) {
    // Move the left pointer to the right if the current character is not alphanumeric
    while (i < j && !isLetterOrDigit(str.charAt(i))) {
      i++;
    }

    // Move the right pointer to the left if the current character is not alphanumeric
    while (i < j && !isLetterOrDigit(str.charAt(j))) {
      j--;
    }

    // Compare the characters at the left and right pointers after converting to lowercase
    if (str.charAt(i).toLowerCase() !== str.charAt(j).toLowerCase()) {
      return false; // Return false if characters don't match
    }

    i++; // Move the left pointer to the right
    j--; // Move the right pointer to the left
  }

  return true; // Return true if all characters match
}

function isLetterOrDigit(character: string): boolean {
  const charCode = character.charCodeAt(0);
  return (
    (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.charCodeAt(0)) || // Check if character is a lowercase letter
    (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.charCodeAt(0)) || // Check if character is an uppercase letter
    (charCode >= '0'.charCodeAt(0) && charCode <= '9'.charCodeAt(0)) // Check if character is a digit
  );
}
