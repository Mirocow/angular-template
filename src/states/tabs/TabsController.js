'use strict';

/* Controller TabsController */

app.controller('TabsController', [
  '$log',
  '$scope',
  '$controller',
  '$routeParams',
  '$window',
  '$timeout',
  'blockUI',
  function($log, $scope, $controller, $routeParams, $window, $timeout, blockUI) {

    $log.log('Init TabsController');

      $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
      ];

      $scope.SwitchTab = function(){
        blockUI.start("Loading...");

        $timeout(function() {
          blockUI.stop();
        }, 2000);

      };

      $scope.model = {
        name: 'Tabs'
      };

}]);