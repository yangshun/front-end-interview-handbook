export default function anagramGroups(strs: string[]): string[][] {
  // Create a map to store the anagrams.
  // The keys are the sorted versions of the strings,
  // and the values are arrays containing the original strings (anagrams).
  let map = new Map<string, string[]>();

  // Iterate over each string in the input array
  for (let str of strs) {
    // Convert the string to a character array and sort it alphabetically
    let chars = Array.from(str);
    chars.sort();

    // Join the sorted characters to form a key
    // This key will be the same for all anagrams
    let key = chars.join('');

    // If the key doesn't exist in the map, add it with an empty array as the value
    if (!map.has(key)) map.set(key, []);

    // Add the original string to the array of anagrams for this key
    map.get(key)!.push(str);
  }

  // Convert the map's values to an array and return it.
  // Each element in the array is a group of anagrams.
  return Array.from(map.values());
}
