var app = angular.module('sudoku', []);

app.controller('MainCtrl', function($scope) {
  
  $scope.battlefield = [
    [1,6,4, null, null, null, null, null, null],
    [2, null, null, 4, null, 3, 9, 1, null],
    [null, null, 5, null, 8, null, 4, null, 7],
    [null, 9, null, null, null, 6, 5, null, null],
    [5, null, null, 1, null, 2, null, null, 8],
    [null, null, 8, 9, null, null, null, 3, null],
    [8, null, 9, null, 4, null, 2, null, null],
    [null, 7, 3, 5, null, 9, null, null, 1],
    [4, null, null, null, null, null, 6, 7, 9]
  ];
  // $scope.battlefield = [
  //   [null, null, 5, null, null, null, 7, null, null],
  //   [null, null, null, null, null, 2, null, 3, 4],
  //   [null, null, null, null, null, 4, 8, null, null],
  //   [null, 5, null, null, null, null, null, 9, 2],
  //   [null, null, null, 9, null, null, 6, null, 8],
  //   [null, 8, 4, null, 2, null, 5, null, null],
  //   [null, 2, null, null, 5, 1, null, null, null],
  //   [null, null, null, null, 7, 8, 2, null, 9],
  //   [null, null, 6, null, null, null, null, 7, null]
  // ];
  
  var size = $scope.battlefield.length;  
  
  $scope.check = function(row, col) {
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

    console.log("Check", colStart, rowStart)
    
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
    for (var r = 0; r < size; r ++) {
      for (var c = 0; c < size; c ++) {
        if (!$scope.battlefield[r][c]) {
          var allVariants = $scope.check(r,c);        
          if (allVariants.length === 1) {
            $scope.battlefield[r][c] = allVariants[0];
          }
        }
      }
    }
  }
  
})