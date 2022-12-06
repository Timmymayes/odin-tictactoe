let GameBoard = (function () {
  // variables
  let gameBoard = {};
  let _board = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];

  //functions
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

  gameBoard.addPiece = function (piece, row, col) {
    _board[row][col] = piece;
  };

  return gameBoard;
})();
