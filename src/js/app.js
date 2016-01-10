'use strict';

/* App Module */

var app = angular.module('App', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'blockUI',
  'ngSanitize',
  'ngAnimate',
  'restangular',
  'ngStorage',
  //'permission',
  'ui.bootstrap',
  //'ngMaterial',
  'ui.grid',
  'ui.grid.edit',
  'ui.grid.saveState',
  'ui.grid.selection',
  'ui.grid.cellNav',
  'ui.grid.resizeColumns',
  'ui.grid.moveColumns',
  'ui.grid.pinning',
  'ui.grid.autoResize'
]);

// ui.route
app.config([
  '$httpProvider',
  '$stateProvider',
  '$urlRouterProvider',
  'navItemsProvider',
  'RestangularProvider',
  '$compileProvider',
  function($httpProvider, $stateProvider, $urlRouterProvider, navItemsProvider, RestangularProvider, $compileProvider) {

    $compileProvider.debugInfoEnabled(false);

    // ngRoute
    $urlRouterProvider
      //
      // Выставляем стейт по умолчанию
      .otherwise('/home');

    // ui-route
    $stateProvider

      .state('loading', {
        url: '/loading',
        template: 'Loading ...',
      })

      .state('auth', {
        url: '/auth',
        abstract: true,
        template: '<ui-view>',
        controller: 'AuthController',
      })

      .state('auth.login', {
        url: '/login',
        templateUrl: './partials/auth/login.html',
        data: {
          'noLogin': true
        }
      })

      ;

    //
    // Подключаем стейты для навигационного бара
    var navItems = navItemsProvider.$get().items();

    angular.forEach(navItems, function (item) {
      $stateProvider.state(item.state, item);
    });

    RestangularProvider.setBaseUrl("http://localhost:8000");

    /*RestangularConfigurer.addFullRequestInterceptor(function (element, operation, route, url, headers, params, httpConfig) {

        if (operation === 'get'){
            $log.warn("RestangularProvider: call to get");
            params.ts= new Date();
        }

        return {
            element: element,
            headers: headers,
            params: params,
            httpConfig: httpConfig
        };

      });*/

}]);

app.run([
    '$log',
    '$rootScope',
    '$state',
    '$stateParams',
    'authService',
    'blockUI',
    function ($log, $rootScope, $state, $stateParams, authService, blockUI) {

      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      $rootScope.user = null;

      var statesThatDontRequireAuth = ['auth.login'];

      var isGoingToStateInStatesThatDontRequireAuth = function (state) {
          return ['auth.login'].some(function (noAuthRoute) {
              return state === noAuthRoute;
          });
      };

      // Проверяем авторизацию
      $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams) {

          blockUI.start("Loading...");

          if(!isGoingToStateInStatesThatDontRequireAuth(toState.name) && !authService.isAuthenticated()){
            $log.log('Access is denied');
            event.preventDefault();
            $state.go('auth.login', {notify: false});
            blockUI.stop();
          } else {
            $log.log('Access is allowed');
            blockUI.stop();
          }

        }
      );

      $log.log('App start');

    }
]);
