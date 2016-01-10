'use strict';

/* Controller AuthController */

app.controller('AuthController', [
  '$log',
  '$scope',
  '$controller',
  '$routeParams',
  '$state',
  'authService',
  function($log, $scope, $controller, $routeParams, $state, authService) {

    $log.log('Init AuthController');

    $scope.user = $scope.user || {};
    $scope.loginForm = {submitDisabled: false};
    $scope.hint = true;

    if(authService.isAuthenticated())
    {
      $state.go('home');
    }

    $scope.submit = function () {
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

}]);