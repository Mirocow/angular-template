app.factory('navItems', function(){
  return {
    items: function(){
      return [
          {
            state: 'home',
            text: 'Home',
            url: '/home',
            controller: 'HomeController',
            templateUrl: 'partials/states/home/home.ng.html',
          },
          {
            state: 'document',
            text: 'Documentation',
            url: '/document/index',
            controller: 'DocumetsController',
            templateUrl: 'partials/states/documents/documents.ng.html',
          },
          {
            state: 'tabs',
            text: 'Tabs example',
            url: '/tabs-example',
            controller: 'TabsController',
            templateUrl: 'partials/states/tabs/tabs.ng.html',
          }
      ];
    }
  }
});