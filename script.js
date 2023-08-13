const gridContainer = document.getElementById("grid");
const solveButton = document.getElementById("solveButton");
const generateButton = document.getElementById("generateButton");

let grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function isValidNumber(num, row, col) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidNumber(num, row, col)) {
            grid[row][col] = num;
            if (solveSudoku()) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSudoku() {
  // Clear the grid
  grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  // Generate a complete puzzle
  solveSudoku();

  // Remove numbers to create a puzzle
  const numToRemove = 40; // Adjust the difficulty by changing the number of removed cells
  for (let i = 0; i < numToRemove; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    grid[row][col] = 0;
  }
}

function isValidMove(num, row, col) {
    return isValidNumber(num, row, col);
  }

  function updateGrid() {
    gridContainer.innerHTML = "";
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.tabIndex = 0; // Make the cell focusable
        const value = grid[row][col];
        cell.textContent = value === 0 ? "" : value;
  
        // Listen for keyboard events to input numbers directly
        cell.addEventListener("keydown", (event) => {
          if (value === 0 && event.key >= 1 && event.key <= 9) {
            const num = parseInt(event.key);
            if (isValidMove(num, row, col)) {
              grid[row][col] = num;
              cell.classList.add("valid"); // Add valid class
              cell.classList.remove("invalid"); // Remove invalid class
              updateGrid();
            } else {
              cell.classList.add("invalid"); // Add invalid class
              cell.classList.remove("valid"); // Remove valid class
            }
          }
        });
  
        gridContainer.appendChild(cell);
      }
    }
  }

solveButton.addEventListener("click", () => {
  solveSudoku();
  updateGrid();
});

generateButton.addEventListener("click", () => {
  generateSudoku();
  updateGrid();
});

generateSudoku();
updateGrid();
