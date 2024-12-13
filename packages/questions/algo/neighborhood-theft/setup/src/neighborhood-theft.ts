export default function neighborhoodTheft(numbers: number[]): number {
  const N = numbers.length;

  // Special handling for empty case (no houses to rob).
  if (N === 0) {
    return 0;
  }

  // This array stores the maximum amount of money that can be robbed when considering up to each house.
  // Note: The calculation starts from the last house and moves backward.
  const maxRobbedAmount: number[] = new Array(N + 1).fill(0);

  // Base case initializations:
  // - maxRobbedAmount[N] (robbing the last house + next house is impossible): set to 0.
  // - maxRobbedAmount[N - 1] (robbing only the last house): set to the value in the last house.
  maxRobbedAmount[N] = 0;
  maxRobbedAmount[N - 1] = numbers[N - 1];

  // DP table calculations (iterating backwards from the second-last house):
  // For each house 'i' (from N-2 to 0):
  //   - Consider two options:
  //     1. Rob the current house 'i' and skip the next house (i+1).
  //     2. Skip the current house 'i' and rob the house after next (i+2).
  //   - Choose the option that yields the maximum total amount for ending at house 'i'.
  //   - Store the chosen maximum amount in maxRobbedAmount[i].
  for (let i = N - 2; i >= 0; i--) {
    maxRobbedAmount[i] = Math.max(
      maxRobbedAmount[i + 1],
      maxRobbedAmount[i + 2] + numbers[i],
    );
  }

  // The maximum amount the robber can steal is stored in maxRobbedAmount[0]
  // (represents the maximum achievable by ending at the first house).
  return maxRobbedAmount[0];
}
