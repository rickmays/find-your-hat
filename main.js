// This JavaScript program is for a simple console game, where you
// have lost your hat in a field with a lot of holes. The objective
// is to find your hat without falling into a hole or going out of
// bounds.

// Import prompt-sync library to simplify getting user input
const prompt = require("prompt-sync")({ sigint: true });

let terminate = false;

// Declare global constants for display characters
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Class Field contains a 2D array (field) containing field
// characters, the "lost" hat and hole characters. It also contains
// properties for the current location (row/column) of the player
// (pathCharacter), which is set randomly when the field is created.
class Field {
  constructor(field) {
    // The field is a 2D array, a grid, with player-entered height
    // and width
    this.field = field;
    this.height = field.length;
    this.width = field[0].length;
    // Set random initial player position on the field
    this.currentRow = Math.floor(Math.random() * this.height);
    this.currentColumn = Math.floor(Math.random() * this.width);
    // If player lands on the space with the hat "^" they win
    this.gameOver = false;
  }

  static generateField() {
    // Get player input for field dimensions and the percentage of holes
    const fieldHeight = Number(prompt("Enter desired height of field: "));
    const fieldWidth = Number(prompt("Enter desired width of field: "));
    const percentHoles = Number(prompt("Enter percentage of holes: ")) / 100;

    // Create 2D array for the field with just the field characters
    const field = Array.from(Array(fieldHeight), () => {
      return new Array(fieldWidth).fill(fieldCharacter);
    });
    // Randomly set approximately the percentage of holes entered
    // by the player
    for (let i = 0; i < fieldHeight; i++) {
      for (let j = 0; j < fieldWidth; j++) {
        field[i][j] = Math.random(0, 1) <= percentHoles ? hole : fieldCharacter;
      }
    }
    return field;
  }

  // Method to display the current field to the console
  print() {
    let printField = "";
    this.field.forEach((row) => {
      // Build a string containing the field
      printField += row.join("");
      printField += "\n";
    });
    // Output the field to the console
    console.log(printField);
  }

  checkForGameOver() {
    // Check if player moves out of bounds and end the game if they
    // do
    if (
      this.currentRow < 0 ||
      this.currentRow === this.height ||
      this.currentColumn < 0 ||
      this.currentColumn === this.width
    ) {
      this.gameOver = true;
      console.clear();
      console.log("Out of bounds, GAME OVER!!");
      this.playAgain();
      return;
    }

    // Check if player lands on the space containing the "lost" hat,
    // congratulate them on winning the game, and end the game
    if (this.field[this.currentRow][this.currentColumn] === hat) {
      this.gameOver = true;
      console.clear();
      console.log("Congratulations, you found your hat!");
      this.playAgain();
      return;
    }
    // Check if player lands on a space containing a hole and end
    // the game if they do
    if (this.field[this.currentRow][this.currentColumn] === hole) {
      this.gameOver = true;
      console.clear();
      console.log("Sorry, you fell into a hole! GAME OVER!!");
      this.playAgain();
      return;
    }
  }

  playAgain() {
    let again = "";
    console.log("\n");
    again = prompt("Thank you for playing! Play again? (y/n) ");
    if (again === "y") {
      return;
    }
    terminate = true;
    return;
  }

  play() {
    // Initialize variable that will contain the direction the player
    // wants to move
    let move = "";
    // Set a random position for the "lost" hat
    this.field[Math.floor(Math.random() * this.height)][
      Math.floor(Math.random() * this.width)
    ] = hat;
    // Keep playing until the hat is found - player out of bounds or
    // falling in a hole are handled with if statements below
    while (!this.gameOver) {
      // Before each move, set the player's position, clear the
      // console, and display the field
      this.field[this.currentRow][this.currentColumn] = pathCharacter;
      console.clear();
      this.print();
      // Prompt the player for their next move and increment/
      // decrement the appropriate row or column of the field
      move = prompt("Which way? (d)own, (u)p, (l)eft, (r)ight: ");
      switch (move) {
        case "d":
          this.currentRow += 1;
          break;
        case "u":
          this.currentRow -= 1;
          break;
        case "l":
          this.currentColumn -= 1;
          break;
        case "r":
          this.currentColumn += 1;
          break;
        default:
          break;
      }
      this.checkForGameOver();
    }
  }
}

// Instantiate new Field object
while (!terminate) {
  let myField = new Field(Field.generateField());
  // Start the game
  myField.play();
}
console.clear();
console.log("Thank you for playing, have a great day!");
