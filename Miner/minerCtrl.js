var app = angular.module('miner', []);
app.controller('MinerCtrl', function($scope) {


	$scope.sizeX = 10;
	$scope.sizeY = 10;
	$scope.mines = 10;

	$scope.newGame = function() {
		$scope.game = new Miner([$scope.sizeX, $scope.sizeY], $scope.mines);
	};

	$scope.newGame();

	$scope.clickCell = function(x,y) {
		var cell = $scope.game.getCell(x,y);

		if(!cell.open) {			
			$scope.game.openCell(x,y);
		} else {
			// $scope.game.checkNeighbors(x,y);
		}
	};


	$scope.flagCell = function(x, y) {
		$scope.game.setFlag(x,y);
	};



})