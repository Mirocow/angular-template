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
      });

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
    function ($log, $rootScope, $state, $stateParams, authService) {

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

          if(!isGoingToStateInStatesThatDontRequireAuth(toState.name) && !authService.isAuthenticated()){
            $log.log('Access is denied');
            event.preventDefault();
            $state.go('auth.login', {notify: false});
          } else {
            $log.log('Access is allowed');
          }

        }
      );

      $log.log('App start');

    }
]);