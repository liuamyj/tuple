'use strict';

app.controller('TimerController', ['$scope', '$rootScope', '$interval', function($scope, $rootScope, $interval) {
  $scope.timer = 0;

  if($scope.myInterval){
  	$interval.cancel($scope.myInterval);
  }
  $scope.onInterval = function(){
    $scope.timer++;
  };
  $scope.myInterval = $interval($scope.onInterval,1000);

  $rootScope.$on('stopTimer', function() {
    $interval.cancel($scope.myInterval);
  });
}]);

app.filter('mmss', function () {
  return function (time) {
    var elapsed = parseInt(time, 10); 
    var minutes = Math.floor(elapsed / 60);
    var seconds = elapsed - (minutes * 60);

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time = minutes+':'+seconds;
    return time;
  }
});