const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.height = field.length;
    this.width = field[0].length;
    this.currentRow = 0;
    this.currentColumn = 0;
    this.foundHat = false;
  }

  static generateField() {
    const fieldHeight = prompt("Enter desired height of field: ");
    const fieldWidth = prompt("Enter desired width of field: ");
    const field = Array.from(Array(Number(fieldHeight)), () => {
      return new Array(Number(fieldWidth)).fill(fieldCharacter);
    });
    return field;
  }

  print() {
    let printField = "";
    this.field.forEach((row) => {
      // console.log(`ROW: ${row}`);
      printField += row.join("");
      printField += "\n";
    });
    console.log(printField);
    // console.log(this.height);
    // console.log(this.width);
  }

  play() {
    let move = "";
    while (!this.foundHat) {
      console.clear();
      this.print();
      console.log(`row: ${this.currentRow}`);
      console.log(`column: ${this.currentColumn}`);
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

      if (
        this.currentRow < 0 ||
        this.currentRow === this.height ||
        this.currentColumn < 0 ||
        this.currentColumn === this.width
      ) {
        console.log("Out of bounds, GAME OVER!!");
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
      this.field[this.currentRow][this.currentColumn] = pathCharacter;
    }
  }
}

// const myField = new Field([
//   ["*", "O", "░", "░", "O", "░", "░", "░", "░", "░"],
//   ["░", "░", "░", "░", "░", "░", "░", "O", "░", "░"],
//   ["░", "░", "░", "░", "░", "░", "░", "░", "░", "░"],
//   ["░", "░", "░", "░", "░", "░", "░", "O", "░", "░"],
//   ["░", "░", "░", "░", "O", "░", "░", "░", "░", "░"],
//   ["░", "░", "░", "░", "░", "O", "░", "░", "░", "░"],
//   ["░", "░", "░", "O", "░", "░", "░", "░", "░", "░"],
//   ["░", "░", "░", "░", "░", "O", "░", "░", "░", "░"],
//   ["░", "O", "O", "░", "░", "░", "░", "░", "░", "░"],
//   ["░", "O", "^", "░", "░", "░", "░", "░", "░", "░"],
// ]);
const myField = new Field(Field.generateField());
myField.play();
