const container = document.getElementById("container");

function whichBlock(row, column) {
  key = parseInt(row / 3).toString() + " " + parseInt(column / 3).toString();
  const dict = {
    "0 0": 0,
    "0 1": 1,
    "0 2": 2,
    "1 0": 3,
    "1 1": 4,
    "1 2": 5,
    "2 0": 6,
    "2 1": 7,
    "2 2": 8,
  };
  return dict[key];
}
function intersection(arr1, arr2) {
  let i = 0;
  let j = 0;
  let intersect = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] > arr2[j]) {
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      intersect.push(arr1[i]);
      i++;
      j++;
    }
  }
  return intersect;
}

function createGrid(container) {
  let html = "";
  let html2 = "";

  for (let i = 0; i < 9; i++) {
    html = `<div class="block" id="b${i}">`;
    for (let j = 0; j < 9; j++) {
      html += `<div class="cell"><p></p></div>`;
    }
    html += `</div>`;
    html2 += html;
  }
  container.innerHTML = html2;
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function fillCells(S) {
  const htmlCells = document.getElementsByClassName("cell");
  for (let i = 0; i < 81; i++) {
    htmlCells[i].innerHTML = S.cells[i].value;
  }
}
createGrid(container);

class cell {
  constructor(value, block, row, column) {
    this.value = value;
    this.block = block;
    this.row = row;
    this.column = column;
  }
}
class block {
  constructor(block) {
    this.block = block;
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}
class row {
  constructor(row) {
    this.row = row;
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}
class column {
  constructor(column) {
    this.column = column;
    this.values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}

class Sudoku {
  constructor() {
    this.rows = [];
    this.columns = [];
    this.blocks = [];
    this.cells = [];
    for (let i = 0; i < 9; i++) {
      this.rows.push(new row(i));
      this.columns.push(new column(i));
      this.blocks.push(new block(i));
    }
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.cells.push(
          new cell(
            0,
            this.blocks[whichBlock(i, j)],
            this.rows[i],
            this.columns[j]
          )
        );
      }
    }
    this.cells.sort((cell1, cell2) => cell1.block.block - cell2.block.block);
  }

  solve() {
    for (let i = 0; i < 81; i++) {
      let choices = intersection(
        intersection(this.cells[i].block.values, this.cells[i].row.values),
        this.cells[i].column.values
      );
      if (choices.length == 0) {
        return false;
      }
      let v = randomChoice(choices);
      this.cells[i].value = v;
      this.cells[i].block.values.splice(
        this.cells[i].block.values.indexOf(v),
        1
      );
      this.cells[i].row.values.splice(this.cells[i].row.values.indexOf(v), 1);
      this.cells[i].column.values.splice(
        this.cells[i].column.values.indexOf(v),
        1
      );
    }
    return true;
  }
}

let S = new Sudoku();
S.solve();
while (!S.solve()) {
  S = new Sudoku();
}
fillCells(S);