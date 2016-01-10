'use strict';

/* Controller IndexController */

app.controller('IndexController', [
  '$log',
  '$scope',
  '$controller',
  '$routeParams',
  'helloWorld',
  'helloWorldFromFactory',
  'helloWorldFromService',
  function($log, $scope, $controller, $routeParams, helloWorld, helloWorldFromFactory, helloWorldFromService) {

    angular.extend(this, $controller('AuthController', {$scope: $scope, $routeParams: $routeParams}));

    $log.log('Init IndexController');

    $scope.hellos = [
        helloWorld.sayHello(),
        helloWorldFromFactory.sayHello(),
        helloWorldFromService.sayHello()];

    $log.log($scope.hellos);

}]);