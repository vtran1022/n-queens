/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});

  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      solution.togglePiece(r, c);
      if (solution.hasAnyRooksConflicts(r, c)) {
        solution.togglePiece(r, c);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;

  var innerRecursion = function (r) {
    if (r === n) {
      solutionCount++;
      return;
    }

    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c);

      if (!board.hasColConflictAt(c)) {
        innerRecursion(r + 1);
      }

      board.togglePiece(r, c);
    }
  };

  innerRecursion(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// var vectors = [
//   // r, c
//   [1, 0],
//   [-1, 0],
//   [0, 1],
//   [0, -1]
// ];
// const handleMove = (board, lastCoords) => {
//   let solutionCount = 0;
//   for (var i = 0; i < vectors.length; i++) {
//     const vec = vectors[i];

//     const rowMove = lastCoords[0] + vec[0];
//     const columnMove = lastCoords[1] + vec[1];
// check here if moves within bounds
//     board = board.togglePiece(rowMove, columnMove);
//     if (board.hasAnyRooksConflicts()) {
//       return solutionCount;
//     }

//     handleMove()
//   }

//   return solutionCount;
// };

// for (var r = 0; r < n; r++) {
//   for (var c = 0; c < n; c++) {
//     solutionCount += handleMove();
//   }
// }

// var solution = new Board({'n': n});


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, count) {
  var solution = new Board({'n': n});

  var moveQueen = function(count) {
    var row = count;

    if (count === n) {
      return true;
    }

    for (var col = 0; col < n; col++) {
      solution.togglePiece(row, col);
      count++;

      if (!solution.hasAnyQueenConflictsOn(row, col)) {
        if (moveQueen(count)) {
          return true;
        }
      }

      solution.togglePiece(row, col);
      count--;
    }
  };

  moveQueen(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({'n': n});
  var solutionCount = 0;

  var innerRecursion = function (r) {
    if (r === n) {
      solutionCount++;
      return;
    }
    for (var c = 0; c < n; c++) {
      board.togglePiece(r, c);

      if (!board.hasAnyQueensConflicts()) {
        innerRecursion(r + 1);
      }

      board.togglePiece(r, c);
    }
  };

  innerRecursion(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
