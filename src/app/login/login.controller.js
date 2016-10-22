(function() {
  'use strict';

  angular
    .module('loginAuthentication')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($sessionStorage, $rootScope, $state, LoginService, $stateParams, $location) {
    var vm = this;
    var role_id

    //login function
    vm.login = function () {
      // var formData = {
      //   user: {
      //     email: vm.email,
      //     password: vm.password
      //   }
      // }
      LoginService.authenticate()
        .then(function (data, status, headers, config) {
          vm.loginStatus = null;
          console.log(data)
          console.log(vm.email)
          console.log(vm.password)
          angular.forEach(data, function(value, key){
            if(data[key].email == vm.email && data[key].password == vm.password){
              role_id = data[key].role_id;
            }
            // console.log(value)
          })
          // var panelName = $sessionStorage.panelName;
          // $sessionStorage.token = data.auth_token;
          $sessionStorage.id = data.id;
          $sessionStorage.email = data.email;
          $sessionStorage.role_id = data.role_id;
          switch (role_id) {
            // case 'sales_and_datacollector': break;
            // case 'admin': break;
            // case 'areamanager': break;
            // case 1:
	           //  if(panelName === 'reviewpanel'){
            //     LoginUtils.setLoginStatus(true);
            //     $state.go(panelName);
            //   } else{
            //     vm.loginStatus = 'Unauthorized to access';
            //   }
            //   break;
            case 1: 
              // if(panelName === 'appointmentpanel'){
                // LoginUtils.setLoginStatus(true);
                $state.go('appointmentpanel');
              // } else{
                // vm.loginStatus = 'Unauthorized to access';
              // }
              break;
            // case 'data_verifier':
	           //  if(panelName === 'verify' || panelName === 'publish' || panelName === 'reviewpanel' || panelName === 'customer'){
            //     LoginUtils.setLoginStatus(true);
            //     $state.go(panelName);
            //   } else{
            //     vm.loginStatus = 'Unauthorized to access';
            //   }
            //   break;
            case 2:
              // if(panelName === 'product'){
                // LoginUtils.setLoginStatus(true);
                $state.go('product');
              // } else{
                // vm.loginStatus = 'Unauthorized to access';
              // }
              break;
            default: vm.loginStatus = 'Unauthorized to access';
          }
        }, function (data) {
          vm.loginStatus = data.error;
        })
    }

    vm.logout = LoginService.logout;

  }
})();
