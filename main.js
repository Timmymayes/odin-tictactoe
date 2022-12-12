let GameBoard = (function () {
  // variables
  let gameBoard = {};
  let _board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  let _X = "X";
  let _O = "O";

  //functions
  let _init = function () {
    _board = [
      ["_", "_", "_"],
      ["_", "_", "_"],
      ["_", "_", "_"],
    ];
  };

  let _cellIsValid = function (row, col) {
    if (row > 2 || row < 0 || col > 2 || col < 0) {
      console.log("The space you provided is not on the board");
      return false;
    }

    if (_board[row][col] != "_") {
      console.log("The space you attempted to place in was already taken");
      return false;
    }

    return true;
  };

  let _addPiece = function (piece, row, col) {
    _board[row][col] = piece;
  };

  let _isBoardFull = function () {
    if (
      _board[0].includes("_") ||
      _board[1].includes("_") ||
      _board[2].includes("_")
    ) {
      return false;
    }
    return true;
  };

  let _getCurrentPaths = function () {
    let result = {
      rows: [],
      cols: ["", "", ""],
      diags: ["", ""],
    };
    let rowData;

    // populate rows;
    _board.forEach((row) => {
      rowData = row[0] + row[1] + row[2];
      result.rows.push(rowData);
    });

    result.rows.forEach((str) => {
      // populate columns;
      result.cols[0] += str[0];
      result.cols[1] += str[1];
      result.cols[2] += str[2];
    });

    result.diags[0] = result.rows[0][0] + result.rows[1][1] + result.rows[2][2];
    result.diags[1] = result.rows[0][2] + result.rows[1][1] + result.rows[2][0];

    return result;
  };

  let _setIsMatched = function (setToCheck) {
    console.log("Set to check: " + setToCheck);
    if (setToCheck === "XXX" || setToCheck === "OOO") {
      return true;
    }
    return false;
  };

  let _checkBoard = function () {
    let _curPaths = _getCurrentPaths();
    let match = {
      matchFound: false,
      piece: "",
      location: 0,
    };
    let rowID = 0;
    let colID = 0;
    let diagID = 0;
    // fix here
    while (rowID < _curPaths.rows.length) {
      if (_setIsMatched(_curPaths.rows[rowID])) {
        match.matchFound = true;
        console.log("match found in a row: " + rowID);
        return match;
      }
      rowID++;
      match.location++;
    }

    while (colID < _curPaths.cols.length) {
      if (_setIsMatched(_curPaths.cols[colID])) {
        match.matchFound = true;
        console.log("Match Found in a col:" + colID);
        return match;
      }
      colID++;
      match.location++;
    }
    while (diagID < _curPaths.diags.length) {
      if (_setIsMatched(_curPaths.diags[diagID])) {
        match.matchFound = true;
        console.log("Match Found in a diag:" + diagID);
        return match;
      }
      diagID++;
      match.location++;
    }
    return match;
  };

  let _isGameOver = function () {
    let result = _checkBoard();
    if (result.matchFound) {
      console.log("The location of the match is " + result.location);
      return true;
    } else {
      console.log("No Match Found\n" + result);
    }

    if (_isBoardFull()) {
      console.log("The game has ended in a draw!");
    }
    return false;
  };

  gameBoard.printBoard = function () {
    console.log(
      "|" + _board[0][0] + "|" + _board[0][1] + "|" + _board[0][2] + "|"
    );
    console.log(
      "|" + _board[1][0] + "|" + _board[1][1] + "|" + _board[1][2] + "|"
    );
    console.log(
      "|" + _board[2][0] + "|" + _board[2][1] + "|" + _board[2][2] + "|"
    );
  };

  let _isValidPiece = function (string) {
    if (string === _X || string === _O) {
      return true;
    } else {
      console.log(
        "Invalid player piece (" + string + ") Please use an X or an O"
      );
      return false;
    }
  };

  let _convertIDtoRowCol = function (num) {
    let result = [];
    // num % 3
    // 0(0) 1(1) 2(2)
    // 3(0) 4(1) 5(2)
    // 6(0) 7(1) 8(2)
    if (num < 3) {
      result[0] = 0;
    } else if (num < 6) {
      result[0] = 1;
    } else if (num < 9) {
      result[0] = 2;
    } else {
      console.log("Error, position out of bounds");
    }
    result[1] = num % 3;

    return result;
  };

  gameBoard.takeTurn = function (piece, pos) {
    piece = piece.toUpperCase();
    let coordinate = _convertIDtoRowCol(pos - 1);
    let row = coordinate[0];
    let col = coordinate[1];
    if (_isValidPiece(piece) && _cellIsValid(row, col)) {
      _addPiece(piece, row, col);
      console.log("Your piece " + piece + " was added at " + row + ":" + col);
    } else {
      console.log("Turn not completed");
    }
    gameBoard.printBoard();
    if (_isGameOver()) {
      console.log("The winner is " + piece);
    }
  };

  gameBoard.reset = function () {
    _init();
  };

  return gameBoard;
})();

let content = document.getElementById("content");
let gameboard = document.getElementById("gameboard");
let cells = document.getElementsByClassName("cell");
Array.from(cells).forEach((cell) => {
  cell.addEventListener("click", printCell);
});

function printCell(e) {
  console.log(e.target.id[5]);

  GameBoard.takeTurn("X", e.target.id[5]);
  let targetCell = Array.from(cells)[e.target.id[5] - 1];
  targetCell.appendChild(document.createTextNode("X"));
}
