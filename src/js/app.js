'use strict';

/* App Module */

var app = angular.module('App', [
  'ngRoute',
  'ngResource',
  'ui.router',
  'blockUI',
  'ngSanitize',
]);

/*app.config([
  '$stateProvider',
  '$urlRouterProvider',
  'navItemsProvider',
  function($stateProvider, $urlRouterProvider, navItemsProvider) {
    //
    // Выставляем стайт по умолчанию
    $urlRouterProvider.otherwise('/');

    //
    // Подключаем стайты для навигационного бара
    var navItems = navItemsProvider.$get().items();

    angular.forEach(navItems, function (item) {
      $stateProvider.state(item.state, item);
    });
}]);*/

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

}]);