'use strict'; 

app.controller('BoardController', ['$scope', '$resource', function($scope, $resource) {

	var numCards; 
	var Board = $resource('/newGame'); 
	var board = Board.query({}, function(){
		$scope.board = board; 
		numCards = board.length; 
	}); 

	$scope.numSets = 0; 
	$scope.numSelected = 0; 
	$scope.selected = []; 

	$scope.toggleSelected = function(index) {
		//if card is selected, deselect it
		if ($scope.selected[index]) {
			$scope.selected[index] = false; 
			$scope.numSelected--; 
		} else {
			//if < 3 cards selected, add new card to selected
			if ($scope.numSelected < 3) {
	   			$scope.selected[index] = true;
	   			$scope.numSelected++; 
	   		}  
	   		if ($scope.numSelected === 3) {
	   			var set = []; 
	   			for (var i = 0; i < numCards; i++) {
	   				if ($scope.selected[i] === true) set.push(i); 
	   			}
	   			//check if 3 selected cards make a set
	   			if (checkSet(set)) {
	   				console.log("set"); 
	   				$scope.numSets++; 
	   				var NewCards = $resource('/deal3Cards'); 
	   				var newCards = NewCards.query({}, function(){
	   					for (var j = 0; j < 3; j++) {
	   						board[set[j]] = newCards[j]; 
	   						$scope.selected[set[j]] = false; 
	   					}
	   					$scope.numSelected = 0;
	   				});
	   			}
	   		}
   		}
	};

	function checkSet(set) {
		var card1 = board[set[0]]; 
		var card2 = board[set[1]]; 
		var card3 = board[set[2]]; 
		for (var index = 0; index < 4; index++) {
			if (!(((card1[index] === card2[index]) && (card2[index] === card3[index])) || 
				((card1[index] !== card2[index]) && (card2[index] !== card3[index]) && (card1[index] !== card3[index]))))
				return false; 
		}
		return true; 
	};
}]);