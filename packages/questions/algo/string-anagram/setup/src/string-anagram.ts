export default function isStringAnagram(str1: string, str2: string): boolean {
  // If the lengths of the two strings are not equal, they cannot be anagrams
  if (str1.length !== str2.length) {
    return false;
  }

  // Convert the strings into character arrays
  let str1Array: string[] = str1.split('');
  let str2Array: string[] = str2.split('');

  // Sort the character arrays
  str1Array.sort();
  str2Array.sort();

  // Check if the sorted character arrays are equal
  for (let i = 0; i < str1Array.length; i++) {
    if (str1Array[i] !== str2Array[i]) {
      return false;
    }
  }

  // If all checks pass, the strings are anagrams
  return true;
}
