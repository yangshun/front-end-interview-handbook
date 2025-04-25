export default function matrixSpiralTraversal(matrix: number[][]): number[] {
  const VISITED = 1001; // Marker for visited cells
  let rows = matrix.length, // Total number of rows
    cols = matrix[0].length; // Total number of columns
  let result: number[] = [matrix[0][0]]; // Result array initialized with the first element
  matrix[0][0] = VISITED; // Mark the first element as visited

  // Four directions: right, down, left, up.
  let directions: number[][] = [
    [0, 1], // Move right
    [1, 0], // Move down
    [0, -1], // Move left
    [-1, 0], // Move up
  ];

  let currentDirection = 0; // Initial direction: moving right
  let changeDirection = 0; // Counter for direction changes
  let row = 0,
    col = 0; // Starting position

  // Continue until the direction changes twice without adding new elements
  while (changeDirection < 2) {
    // Continue moving in the current direction until a boundary or visited cell is encountered
    while (
      row + directions[currentDirection][0] >= 0 &&
      row + directions[currentDirection][0] < rows &&
      col + directions[currentDirection][1] >= 0 &&
      col + directions[currentDirection][1] < cols &&
      matrix[row + directions[currentDirection][0]][
        col + directions[currentDirection][1]
      ] !== VISITED
    ) {
      changeDirection = 0; // Reset changeDirection as we are still adding elements

      // Move to the next cell in the current direction
      row += directions[currentDirection][0];
      col += directions[currentDirection][1];

      result.push(matrix[row][col]); // Add the element to the result
      matrix[row][col] = VISITED; // Mark the cell as visited
    }

    // Change direction
    currentDirection = (currentDirection + 1) % 4; // Cycle through directions
    changeDirection++; // Increment changeDirection as we changed direction
  }

  return result;
}
