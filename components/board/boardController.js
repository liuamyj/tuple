'use strict'; 

app.controller('BoardController', ['$scope', '$rootScope', '$resource', function($scope, $rootScope, $resource) {

	var cardsPerSet = 3; 
	var maxCards = 15; 

	var numCards; 
	var Board = $resource('/newGame'); 
	var board = Board.query({}, function(){
		$scope.board = board; 
		numCards = board.length;  
	}); 

	$scope.numSets = 0; 
	$scope.numSelected = 0; 
	$scope.selected = []; 
	$scope.canDealMore = true; 

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
	   		//if 3 cards are selected, check if they make a set
	   		if ($scope.numSelected === 3) {
	   			var set = []; 
	   			for (var i = 0; i < numCards; i++) {
	   				if ($scope.selected[i] === true) set.push(i); 
	   			}
	   			if (checkSet(set)) {
	   				$scope.numSets++; 
	   				$scope.numSelected = 0;

	   				if (numCards === 12) {
		   				var NewCards = $resource('/deal3Cards'); 
		   				var newCards = NewCards.query({}, function(){
		   					//if no cards left
		   					if (newCards.length === 0) {
		   						removeCards(set); 
		   						if (!boardHasSets()) {
		   							endGame(); 
		   						}  
		   					} else {
			   					for (var j = 0; j < set.length; j++) {
			   						board[set[j]] = newCards[j]; 
			   						$scope.selected[set[j]] = false; 
			   					}
		   					}
		   				});
	   				} else {
	   					removeCards(set); 
	   					if (numCards < 12) {
	   						if (!boardHasSets()) {
		   						endGame(); 
		   					}   
	   					}
	   				}
	   			}
	   		}
   		}
	};

	$scope.dealMore = function() {
		if (numCards < 15) {
			var NewCards = $resource('/deal3Cards'); 
		   	var newCards = NewCards.query({}, function(){
		   		for (var j = 0; j < newCards.length; j++) {
		   			board.push(newCards[j]); 
		   			$scope.selected[board.length - 1] = false; 
		   			numCards++; 
		   		}
		   	});
	    }
	};

	function removeCards(set) {
		for (var j = set.length-1; j >= 0; j--) {
		   	board.splice(set[j], 1);  
		   	$scope.selected[set[j]] = false; 
		   	numCards--; 
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

	function boardHasSets() {
		for (var i = 0; i < board.length - 2; i++) {
			for (var j = i+1; j < board.length - 1; j++) {
				for (var k = j+1; k < board.length; k++) {
					var set = [i, j, k];  
					if (checkSet(set)) {
						return true; 
					} 
				}
			}
		}
		return false; 
	};

	function endGame() {
		$rootScope.$broadcast('stopTimer');  
	};
}]);