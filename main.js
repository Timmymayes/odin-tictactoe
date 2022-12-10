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

    result.diags[0] =
      result.rows[0][0] + result.rows[1][1] + result.rows[(2, 2)];
    result.diags[1] = result.rows[0][2] + result.rows[1][1] + result.rows[2][0];

    return result;
  };

  let _setIsMatched = function (setToCheck) {
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
    while (rowID <= _curPaths.rows.length) {
      if (_setIsMatched(_curPaths.rows[rowID])) {
        match.matchFound = true;
        match.piece = _curPaths.row[rowID][0];
        console.log("Match Found in a row:" + rowID);
        return match;
      }
      rowID++;
      match.location++;
    }

    while (colID <= _curPaths.cols.length) {
      if (_setIsMatched(_curPaths.cols[colID])) {
        match.matchFound = true;
        match.piece = _curPaths.cols[colID][0];
        console.log("Match Found in a col:" + colID);
        return match;
      }
      colID++;
      match.location++;
    }
    while (diagID <= _curPaths.diags.length) {
      if (_setIsMatched(_curPaths.diags[diagID])) {
        match.matchFound = true;
        match.piece = _curPaths.diags[diagID][0];
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
      console.log(result.piece + " has won the game!");
      console.log("The location of the match is " + match.location);
    } else {
      console.log("No Match Found\n" + result);
    }

    if (_isBoardFull()) {
      console.log("The game has ended in a draw!");
    }
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
    string = string.toUpperCase();
    if (string === _X || string === _O) {
      return true;
    } else {
      console.log(
        "Invalid player piece (" + string + ") Please use an X or an O"
      );
      return false;
    }
  };

  gameBoard.takeTurn = function (piece, row, col) {
    if (_isValidPiece(piece) && _cellIsValid(row, col)) {
      _addPiece(piece, row, col);
      console.log("Your piece " + piece + " was added at " + row + ":" + col);
    } else {
      console.log("Turn not completed");
    }
    gameBoard.printBoard();
    _isGameOver();
  };

  return gameBoard;
})();
