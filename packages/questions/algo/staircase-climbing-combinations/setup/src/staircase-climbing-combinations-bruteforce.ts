export default function staircaseClimbingCombinations(steps: number): number {
  return climbFromStep(0, steps);
}

// Helper function using recursion to find the number of ways from step i to n
function climbFromStep(currentStep: number, totalSteps: number): number {
  // If current step exceeds total steps, no valid way
  if (currentStep > totalSteps) {
    return 0;
  }
  // If current step equals total steps, one valid way found
  if (currentStep === totalSteps) {
    return 1;
  }
  // Sum of ways by taking 1 step or 2 steps
  return (
    climbFromStep(currentStep + 1, totalSteps) +
    climbFromStep(currentStep + 2, totalSteps)
  );
}
