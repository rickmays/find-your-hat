const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.height = 10;
    this.width = 10;
    this.currentRow = 0;
    this.currentColumn = 0;
    this.foundHat = false;
  }

  print() {
    let printField = "";
    this.field.forEach((row) => {
      printField += row.join("");
      printField += "\n";
    });
    console.log(printField);
  }

  play() {
    let move = "";
    while (!this.foundHat) {
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

      if (this.field[this.currentRow][this.currentColumn] === hat) {
        console.log("Congratulations, you found your hat!");
        break;
      }
      if (this.field[this.currentRow][this.currentColumn] === hole) {
        console.log("Sorry, you fell into a hole! GAME OVER!!");
        break;
      }
      if (
        this.currentRow < 0 ||
        this.currentRow === this.height ||
        this.currentColumn < 0 ||
        this.currentColumn === this.width
      ) {
        console.log("Out of bounds, GAME OVER!!");
        break;
      }
      console.log(`row: ${this.currentRow}`);
      console.log(`column: ${this.currentColumn}`);
    }
  }
}

const myField = new Field([
  ["*", "O", "░", "░", "O", "░", "░", "░", "░", "░"],
  ["░", "░", "░", "░", "░", "░", "░", "O", "░", "░"],
  ["░", "░", "░", "░", "░", "░", "░", "░", "░", "░"],
  ["░", "░", "░", "░", "░", "░", "░", "O", "░", "░"],
  ["░", "░", "░", "░", "O", "░", "░", "░", "░", "░"],
  ["░", "░", "░", "░", "░", "O", "░", "░", "░", "░"],
  ["░", "░", "░", "O", "░", "░", "░", "░", "░", "░"],
  ["░", "░", "░", "░", "░", "O", "░", "░", "░", "░"],
  ["░", "O", "O", "░", "░", "░", "░", "░", "░", "░"],
  ["░", "O", "^", "░", "░", "░", "░", "░", "░", "░"],
]);

myField.print();
myField.play();
