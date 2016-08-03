
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
	   			console.log(index); 
	   		} else {
	   			var set = []; 
	   			for (var i = 0; i < numCards; i++) {
	   				if (selected[i] === true) set.push(selected[i]); 
	   			}

	   			//check if 3 selected cards make a set 
	   			if (checkSet(set)) {

	   			}
	   		}
   		}
	};

	function checkSet(set) {
		
	};
}]);