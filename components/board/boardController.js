
var app = angular.module('myApp',['ngResource']);

app.controller('BoardController', ['$scope', '$resource', function($scope, $resource) {

	var numCards; 
	var Board = $resource('/newGame'); 
	var board = Board.query({}, function(){
		$scope.board = board; 
		numCards = board.length; 
	}); 

	$scope.numSelected = 0; 
	$scope.selected = []; 

	$scope.toggleSelected = function (index) {
		if ($scope.selected[index]) {
			$scope.selected[index] = false; 
			$scope.numSelected--; 
		} else {
			if ($scope.numSelected < 3) {
	   			$scope.selected[index] = true;
	   			$scope.numSelected++; 
	   		} 
	   		if ($scope.numSelected === 3) {
	   			var set = []; 
	   			for (var i = 0; i < numCards; i++) {
	   				if ($scope.selected[i] === true) set.push($scope.board[i]); 
	   			}

	   			//check if 3 selected cards make a set 
	   			if (checkSet(set)) {
	   				console.log("set"); 
	   			}
	   		}
   		}
	};

	function checkSet(set) {
		for (var index = 0; index < 4; index++) {
			if (!(((set[0][index] === set[1][index]) && (set[1][index] === set[2][index])) || 
				((set[0][index] !== set[1][index]) && (set[1][index] !== set[2][index]) && (set[0][index] !== set[2][index]))))
				return false; 
		}
		return true; 
	};
}]);