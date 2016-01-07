'use strict';

/* App Module */

var app = angular.module('App', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'blockUI',
  'ngSanitize',
  'ngAnimate',
]);

// ui.route
app.config([
  '$httpProvider',
  '$stateProvider',
  '$urlRouterProvider',
  'navItemsProvider',
  function($httpProvider, $stateProvider, $urlRouterProvider, navItemsProvider) {

    $urlRouterProvider

    //.when('/c?id', '/contacts/:id')
    //.when('/user/:id', '/contacts/:id')

    //
    // Выставляем стейт по умолчанию
    .otherwise('/home');

    //
    // Подключаем стейты для навигационного бара
    var navItems = navItemsProvider.$get().items();

    angular.forEach(navItems, function (item) {
      $stateProvider.state(item.state, item);
    });

}]);

/*
// ngRoute
app.config([
  '$routeProvider',
  'navItemsProvider',
  function ($routeProvider, navItemsProvider) {

    var navItems = navItemsProvider.$get().items();

    angular.forEach(navItems, function (item) {
      $routeProvider.when(item.url, item);
    });

    $routeProvider.otherwise({
      redirectTo: '/'
    });
}]);*/

app.run([
    '$rootScope',
    '$state',
    '$stateParams',
    function ($rootScope, $state, $stateParams) {

      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      console.log('App start');

    }
]);