var app = angular.module('sudoku', []);

app.controller('MainCtrl', function($scope) {
  
    $scope.battlefield = [
        [null, null, 5, null, null, null, 7, null, null],
        [null, null, null, null, null, 2, null, 3, 4],
        [null, null, null, null, null, 4, 8, null, null],
        [null, 5, null, null, null, null, null, 9, 2],
        [null, null, null, 9, null, null, 6, null, 8],
        [null, 8, 4, null, 2, null, 5, null, null],
        [null, 2, null, null, 5, 1, null, null, null],
        [null, null, null, null, 7, 8, 2, null, 9],
        [null, null, 6, null, null, null, null, 7, null]
    ];

    $scope.can = function(number, row, col) {
        var size = $scope.battlefield.length;
        var squareSize = 3;
        var colStart = Math.floor(col / squareSize) * squareSize;
        var rowStart = Math.floor(row / squareSize) * squareSize;

        for (var r = rowStart; r < rowStart + squareSize; r++) {
            for (var c = colStart; c < colStart + squareSize; c++) {
                if ($scope.battlefield[r][c] === number) {
                    return false;
                }
            }
        }

        for (var c = 0; c < size; c++) {
            if ($scope.battlefield[row][c] === number) {
                return false;
            }
        }

        for (var r = 0; r < size; r++) {
            if ($scope.battlefield[r][col] === number) {
                return false;
            }
        }

        return true;
    }

    $scope.isEmpty = function(row, col) {
      return $scope.battlefield[row][col] != null;
    }

    $scope.add = function(number, row, col) {
      $scope.battlefield[row][col] = number;
    }

    $scope.checkSquare = function(number, row, col) {
        var squareSize = 3;
        var colStart = Math.floor(col / squareSize) * squareSize;
        var rowStart = Math.floor(row / squareSize) * squareSize;
        var result = null

        for (var r = rowStart; r < rowStart + squareSize; r++) {
            for (var c = colStart; c < colStart + squareSize; c++) {
                if ($scope.isEmpty(r, c)) continue;
                if ($scope.can(number, r, c)) {
                    if (result) {
                        return false;
                    }
                    result = {row: r, col: c};
                }
            }
        }

        return result;
    }

    $scope.checkVariants = function(row, col) {
      var size = $scope.battlefield.length;
      var allVariants = [];
      var shouldBe = [1,2,3,4,5,6,7,8,9];
      
      for (var c = 0; c<size; c++) {
        allVariants.push($scope.battlefield[row][c]);
      }
      
      for (var r = 0; r<size; r++) {      
        allVariants.push($scope.battlefield[r][col]);      
      }
      
      
      var colStart = Math.floor(col/3) * 3;
      var rowStart = Math.floor(row/3) * 3;
      
      for (var r = rowStart; r < rowStart + 3; r++ ) {
        for (var c = colStart; c < colStart + 3; c++) {
          allVariants.push($scope.battlefield[r][c]);
        }
      }
      
      allVariants = _.compact(allVariants);
      allVariants = _.uniq(allVariants);
      allVariants = _.difference(shouldBe, allVariants);
      
      return allVariants;
    }

    $scope.walk = function() {
        var size = $scope.battlefield.length;
        var shouldBe = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (var r = 0; r < size; r = r + 3) {
            for (var c = 0; c < size; c = c + 3) {
                // if ($scope.battlefield[r][c]) continue;

                for (var n of shouldBe) {
                    var result = $scope.checkSquare(n, r, c);
                    if (result) {
                        $scope.add(n, result.row, result.col);
                    }
                }
            }
        }

        for (var r = 0; r < size; r ++) {
            for (var c = 0; c < size; c ++) {
                if ($scope.isEmpty(r, c)) continue;

                var allVariants = $scope.checkVariants(r,c);        
                if (allVariants.length === 1) {
                  $scope.add(allVariants[0], r, c)
                }
            }
        }
    }

})