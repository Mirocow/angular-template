app.provider('runtimeStates', [
  '$stateProvider',
  function($stateProvider) {
  this.$get = function($q, $timeout, $state) {
    return {
      addState: function(name, state) {
        $stateProvider.state(name, state);
      }
    }
  }
}]);