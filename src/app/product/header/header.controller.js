(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductHeaderController', ProductHeaderController);

  /** @ngInject */
  function ProductHeaderController(ProductService, LoginService, $state) {
    var vm = this;
    vm.logout = function(){
      LoginService.logout();
    }
  }
})();