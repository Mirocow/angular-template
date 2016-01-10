'use strict';

/* Controller AuthController */

app.controller('AuthController', [
  '$log',
  '$scope',
  '$controller',
  '$routeParams',
  '$state',
  'authService',
  '$window',
  function($log, $scope, $controller, $routeParams, $state, authService, $window) {

    $log.log('Init AuthController');

    $scope.user = authService.getCurrentUser();
    $scope.loginForm = {submitDisabled: false};
    $scope.hint = true;

    if(authService.isAuthenticated())
    {
      $state.go('home');
    }

    $scope.submit = function (event) {
      $scope.loginForm.submitDisabled = true;
      authService.authenticate($scope.user.name, $scope.user.password).then(function (user) {
          $log.debug('success:', $scope.user);
          $state.go('home');
      }, function (reject) {
          $log.debug('invalid credentials:', reject);
          $scope.hint = true;
      })['finally'](function () {
          $scope.loginForm.submitDisabled = false;
      });
    };

    $scope.logOut = function(event){
      authService.logOut();
      $state.go('home');
      $state.reload();
    }

}]);