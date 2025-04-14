export default function isAnagram(str1: string, str2: string): boolean {
  // If the lengths of the two strings are not equal, they cannot be anagrams
  if (str1.length !== str2.length) {
    return false;
  }

  // Create an array to count the frequency of each character in the alphabet
  const table: number[] = new Array(26).fill(0);

  // Increment the count for each character in string s
  for (let i = 0; i < str1.length; i++) {
    table[str1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }

  // Decrement the count for each character in string t
  for (let i = 0; i < str2.length; i++) {
    table[str2.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    // If count goes negative, strings are not anagrams
    if (table[str2.charCodeAt(i) - 'a'.charCodeAt(0)] < 0) {
      return false;
    }
  }

  // If all counts are zero, strings are anagrams
  return true;
}
