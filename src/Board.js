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
      // create a current row variable
      var currentRow = this.get(rowIndex); //this is the board that we're pulling the row from, used rows function in board visual to find this
      // create a counter variable
      var counter = 0; // starting with belief that there is no conflicts
      // iterate over that row variable
      for (var i = 0; i < currentRow.length; i++) {
      // if the current row is equal to 1
        // add one to the counter variable
        if (currentRow[i] === 1) {
          counter++;
        }
      }
      // After done iterating, if the counter variable is greater than zero, return true otherwise return false
      // cannot be zero b/c when entire board visual light up, so that means this is always true.. the first if (row[i]) is the placement! So counter must be greater than 1 b/c it'll check it afterwards
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
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
      // create a board variable -- row function in the board visual
      var board = this.rows();

      // iterate over that board variable
      for (var i = 0; i < board.length; i++) {
      // check if there is a conflict using the other helper function hasRowConflict
        if (this.hasRowConflictAt(i)) {
        // if there is then return true,
          return true;
        }
      }
      // return false outside the for-loop
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
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return false; // fixme
    },

    /*
    - when changing boolean to 'true', entire board lights up
    */

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      return false; // fixme
    },

    /*
    - when changing boolean to 'true', board does not light up. Can this work in conjuction with hasColConflictAt func? b/c if there is a conflict ANYWHERE, then true.
    */


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },
    /*
    - when changing boolean to 'true', entire board lights up
    */

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      return false; // fixme
    },

    /*
    - when changing boolean to 'true', board does not light up. Can this work in conjuction with hasRowConflictAt func? b/c if there is a conflict ANYWHERE, then true.
    */

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    /*
    - when changing boolean to 'true', entire board lights up
    */

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*
    - when changing boolean to 'true', board does not light up. Can this work in conjuction with hasRowConflictAt func? b/c if there is a conflict ANYWHERE, then true.
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
