export default function isStringPalindrome(str: string): boolean {
  // Initialize an empty string to store filtered characters
  let filteredChars = '';

  // Iterate through each character in the input string
  for (let ch of str) {
    // Check if the character is alphanumeric (a-z, A-Z, 0-9)
    if (ch.match(/[a-z0-9]/i)) {
      // Convert the character to lowercase and add it to the filteredChars string
      filteredChars += ch.toLowerCase();
    }
  }

  // Reverse the filtered characters string
  const reversedChars = filteredChars.split('').reverse().join('');

  // Compare the original filtered string with the reversed string
  // If they are the same, it is a palindrome
  return filteredChars === reversedChars;
}
