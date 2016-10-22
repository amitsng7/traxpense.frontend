(function () {
    'use strict';
  angular.module('loginAuthentication')
    .factory('LoginService', LoginService);
    // .factory('LoginUtils', LoginUtils);

  /** @ngInject */
  function LoginService($http, $q, $sessionStorage, $state) {
    var authenticate = function (formData) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/v1/users'
      })
      .success(function (data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function (data, status, headers, config) {
        deferred.reject(data);
      })
      return deferred.promise;
    }

    var logout = function() {
      $sessionStorage.$reset();
      // LoginUtils.setLoginStatus(false);
      $state.go('login');
    }

    var isLoggedin = function(){
      // return LoginUtils.getLoginStatus();
    }

    return {
      authenticate: authenticate,
      logout: logout,
      isLoggedin: isLoggedin
    }
  };
})();
