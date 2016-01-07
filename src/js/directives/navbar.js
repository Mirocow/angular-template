app.directive('navbar', [
    '$location',
    function ($location) {

    var routePatternAttribute = 'data-route-pattern';

    return {
        restrict: 'A',
        templateUrl: 'partials/navbar/navbar.ng.html',
        controller: 'NavbarController',
        replace: true
    };

}]);