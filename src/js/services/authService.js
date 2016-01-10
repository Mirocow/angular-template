app.service('authService', [
  '$injector',
  '$timeout',
  '$localStorage',
  '$sessionStorage',
  '$state',
  function($injector, $timeout, $localStorage, $sessionStorage, $state) {
    "use strict";

    var userMap = Object.create(null, {
        admin: {
            value: {
                firstName: 'Dear',
                lastName: 'Friend',
                role: 'admin',
                password: 'secret',
            }
        }
    });

    var currentUser = $sessionStorage.$default({user: 'undefined'}).user;
    var authenticated;
    if(currentUser !== 'undefined')
    {
      authenticated = true;
    } else {
      authenticated = false;
    }

    this.authenticate = function (name, password) {
        var promise = $timeout(function () {
            var user = currentUser || 'undefined';
            if (typeof userMap[name] !== 'undefined' && userMap[name]['password'] === password) {
                authenticated = true;
                $sessionStorage.user = userMap[name];
                return user;
            } else {
                delete $sessionStorage.user;
                $timeout.cancel(promise);
            }
        }, 300);
        return promise;
    };

    this.isAuthenticated = function () {
        return authenticated;
    };

    this.getCurrentUser = function () {
        if (authenticated) {
            return currentUser;
        }
    };

    this.logOut = function () {
        authenticated = false;
        currentUser = null;
    };

  }
  ]);