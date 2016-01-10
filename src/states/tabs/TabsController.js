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

    $scope.grid1Options = {
        columnDefs: [
          {field: 'firstName', displayName: 'firstName'},
          {field: 'lastName', displayName: 'lastName'},
        ],
        data: [
            {
                "firstName": "Cox",
                "lastName": "Carney",
            },
            {
                "firstName": "Lorraine",
                "lastName": "Wise",
            },
            {
                "firstName": "Nancy",
                "lastName": "Waters",
            }
        ],
      };

    $scope.grid2Options = {
        columnDefs: [
          {field: 'firstName', displayName: 'firstName'},
          {field: 'lastName', displayName: 'lastName'},
          {field: 'test', displayName: 'Test'},
        ],
        data: [
            {
                "firstName": "Cox",
                "lastName": "Carney",
                test: false,
            },
            {
                "firstName": "Lorraine",
                "lastName": "Wise",
                test: false,
            },
            {
                "firstName": "Nancy",
                "lastName": "Waters",
                test: true,
            }
        ],
      };

    $scope.switchTab = function(tab){

      $scope[tab] = true;

      var tableBlock = blockUI.instances.get('tableBlock');

      tableBlock.start("Loading...");

      $timeout(function() {
        tableBlock.stop();
      }, 2000);

    };

}]);