app.factory('navItems', function(){
  return {
    items: function(msg){
      return [
          {
            state: 'state.home',
            text: 'Home',
            url: '/',
            controller: 'HomeController',
            templateUrl: 'partials/home.ng.html',
          },
          {
            state: 'state.document',
            text: 'Documentation',
            url: '/document/index',
            controller: 'DocumetsController',
            templateUrl: 'partials/document.ng.html',
          }
      ];
    }
  }
});