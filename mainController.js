
var app = angular.module('myApp',['ngResource']);

app.controller('MainController', ['$scope', '$resource', function($scope, $resource) {

	var Board = $resource('/newGame'); 
	var board = Board.query({}, function(){
		$scope.board = board; 
	}); 
}]);