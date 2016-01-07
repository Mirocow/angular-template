'use strict';

/* App Module */

var app = angular.module('App', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'blockUI',
  'ngSanitize',
]);

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

/*app.config([
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
    function ($rootScope) {

      console.log('App start');

    }
]);