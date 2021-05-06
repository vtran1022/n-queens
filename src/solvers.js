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

/*
i: n - to generate the chessboard n x n
o: a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
c: none
e: none

Rooks - only go down the column or row to attack - utilize hasAnyRooksConflicts
- we should use togglePiece to determine if square is taken or not
- solution would be a new board that takes in n
  - looking at rows and columns -- need to define our rows and columns
  - iterate thru the rows and columns using two for loops
    - toggle the cell with the row and column indexes
  - check for conflicts using our row and column conflicts functions
    -if there is a conflict, toggle the piece again


*/

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({'n': n});
  var solutionCount = 0;

  for (var r = 0; r < solution.get('n'); r++) {
    if (this.findNRooksSolution(n)) {
      solutionCount++;
    } else if (!this.findNRooksSolution(n)) {
      solutionCount--;
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
