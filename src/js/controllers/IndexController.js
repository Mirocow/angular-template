'use strict';

/* Controller IndexController */

app.controller('IndexController', [
  '$scope',
  'helloWorld',
  'helloWorldFromFactory',
  'helloWorldFromService',
  function($scope, helloWorld, helloWorldFromFactory, helloWorldFromService) {

    console.log('Init IndexController');

    $scope.hellos = [
        helloWorld.sayHello(),
        helloWorldFromFactory.sayHello(),
        helloWorldFromService.sayHello()];

    console.log($scope.hellos);

}]);