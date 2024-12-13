export default function anagramGroups(strs: string[]): string[][] {
  // If the input array is empty, return an empty array
  if (strs.length === 0) return [];

  // Initialize an object to store groups of anagrams
  // The keys are unique representations of the character counts
  // The values are arrays of strings that match the key's character count
  let ans: { [key: string]: string[] } = {};

  // Iterate over each string in the input array
  for (let s of strs) {
    // Create an array to count occurrences of each character (26 letters of the alphabet)
    let count: number[] = Array(26).fill(0);

    // Increment the corresponding index in the count array for each character in the string
    for (let c of s) count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;

    // Create a key string based on the character counts
    // The key is formatted as a series of "#count" for each character
    let key = '';
    for (let i = 0; i < 26; i++) {
      key += '#';
      key += count[i];
    }

    // If the key doesn't exist in the map, initialize it with an empty array
    if (!ans[key]) ans[key] = [];

    // Add the original string to the array associated with the key
    ans[key].push(s);
  }

  // Return the values of the map, which are the groups of anagrams
  return Object.values(ans);
}
