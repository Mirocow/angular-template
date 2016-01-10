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

    var user = $sessionStorage.$default({user: null}).user;

    this.authenticate = function (name, password) {
        var promise = $timeout(function () {
            if (typeof userMap[name] !== null && userMap[name]['password'] === password) {
                user = userMap[name];
                $sessionStorage.user = user;
                return user;
            } else {
                delete $sessionStorage.user;
                $timeout.cancel(promise);
            }
        }, 300);
        return promise;
    };

    this.isAuthenticated = function () {
        return user !== null || false;
    };

    this.getCurrentUser = function () {
        return user;
    };

    this.logOut = function () {
        delete $sessionStorage.user;
        user = null;
    };

  }
  ]);