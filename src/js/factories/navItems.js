app.factory('navItems', function(){
  return {
    items: function(){
      return [
          {
            state: 'home',
            text: 'Home',
            url: '/home',
            controller: 'HomeController',
            templateUrl: 'partials/home.ng.html',
          },
          {
            state: 'document',
            text: 'Documentation',
            url: '/document/index',
            controller: 'DocumetsController',
            templateUrl: 'partials/document.ng.html',
          }
      ];
    }
  }
});