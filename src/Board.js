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

    hasAnyRowConflicts: function() {
      var board = this.rows();

      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }

      return false;
    },

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

    hasAnyColConflicts: function() {
      var board = this.rows();

      for (var i = 0; i < board.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow, rowIndex) {
      var board = this.rows();
      if (rowIndex === undefined) {
        rowIndex = 0;
      }
      var majorDiagonalIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, majorDiagonalColumnIndexAtFirstRow);
      var counter = 0;

      for (var i = 0; i < board.length; i++) {
        for (var j = majorDiagonalColumnIndexAtFirstRow; j < board.length; j++) {
          if (board[i][j] === 1 && this._getFirstRowColumnIndexForMajorDiagonalOn(i, j) === majorDiagonalIndex) {
            counter++;
            if (counter > 1) {
              return true;
            }
          }
        }
      }

      return false;
    },

    hasAnyMajorDiagonalConflicts: function () {
      var rowsArr = this.rows();
      var columns = this.get('n');

      for (var i = 0; i < columns; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      for (var j = 1; j < rowsArr.length; j++) {
        if (this.hasMajorDiagonalConflictAt(0, j)) {
          return true;
        }
      }

      return false;
    },

    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //

    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow, rowIndex) {
      var board = this.rows();
      if (rowIndex === undefined) {
        rowIndex = 0;
      }
      var minorDiagonalIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, minorDiagonalColumnIndexAtFirstRow);
      var counter = 0;

      for (var i = 0; i < board.length; i++) {
        for (var j = minorDiagonalColumnIndexAtFirstRow; j >= 0; j--) {
          if (board[i][j] === 1 && this._getFirstRowColumnIndexForMinorDiagonalOn(i, j) === minorDiagonalIndex) {
            counter++;
            if (counter > 1) {
              return true;
            }
          }
        }
      }

      return false;
    },

    hasAnyMinorDiagonalConflicts: function() {
      var rowsArr = this.rows();
      var columns = this.get('n');

      for (var i = 0; i < columns; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      for (var j = 1; j < rowsArr.length; j++) {
        if (this.hasMinorDiagonalConflictAt(columns - 1, j)) {
          return true;
        }
      }

      return false;
    }

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
