// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //

    hasRowConflictAt: function(rowIndex) {
      var currentRow = this.get(rowIndex);
      var counter = 0;

      for (var i = 0; i < currentRow.length; i++) {
        if (currentRow[i] === 1) {
          counter++;
        }
      }

      return counter > 1;
    },

    /*
    justification: test if a specific row on this board contains a conflict
    i: rowIndex - an integar that represents which square within the row you're on
    o: a boolean that indicates if there are row conflicts or not
    c: none
    e: none

    - when changing boolean to 'true', entire board lights up
    - this is testing one row at a time, if there is a row conflict at a square, we want to state true but we should also keep track of it since we're testing each square in the ENTIRE row
    */

    hasAnyRowConflicts: function() {
      var board = this.rows();

      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false;
    },

    /*
    justification: test if any rows on this board contain conflicts
    i: no inputs
    o: a boolean that indicates if there are any row conflicts or not
    c: none
    e: none

    - when changing boolean to 'true', board does not light up. Can this work in conjuction with hasRowConflictAt func? b/c if there is a conflict ANYWHERE, then true.
    - this is testing the entire board's rows, so checking each square within each row, if a square has a conflict, we want to state true, since we're testing if conflict anywhere in the board. The hasRowConflictAt is already checking the entire row, should use somehow
    */



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //

    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var counter = 0;

      for (var i = 0; i < board.length; i++) {
        if (board[i][colIndex] === 1) {
          counter++;
        }
      }

      return counter > 1;
    },

    /*
    justification: test if a specific column on this board contains a conflict
    i: colIndex - an integar that represents which square within the column you're on
    o: a boolean that indicates if there are column conflicts or not
    c: none
    e: none

    - when changing boolean to 'true', entire board lights up
    - since the board has an array of rows, but each column is in different parts of the array, need to access first the array then the column index
    */


    hasAnyColConflicts: function() {
      var board = this.rows();

      for (var i = 0; i < board.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },

    /*
    justification: test if any columns on this board contain conflicts
    i: nothing
    o: a boolean that indicates if there are column conflicts or not
    c: none
    e: none
    - when changing boolean to 'true', board does not light up. Can this work in conjuction with hasColConflictAt func? b/c if there is a conflict ANYWHERE, then true.
    */


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.rows();
      var majorDiagonalIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, majorDiagonalColumnIndexAtFirstRow);
      var counter = 0;


    },
    /*
      _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    justification: test if a specific major diagonal on this board contains a conflict
    i: majorDiagonalColumnIndexAtFirstRow: the col index in the nth row for the major diagonal
    [0 1] <- row index 0, column index 1
    [1 0] <- row index 1, column index 0

    o: a boolean value that indicates if there are any major diagonal conflicts
    c: none
    e: none

    this takes in a helper function that finds the index of the majorDiagonalIndex
    */



    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },

    /*

    */

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    /*

    */

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*

    */

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
