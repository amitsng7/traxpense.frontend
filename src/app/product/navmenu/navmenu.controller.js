(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductNavMenuController', ProductNavMenuController);

  /** @ngInject */
  function ProductNavMenuController(ProductService, LoginService, $state) {
    var vm = this;
    if($state.current.name == 'product.speciality'){
      vm.tab = 1;
    }
    if($state.current.name == 'product.specialization'){
      vm.tab = 2;
    }
    if($state.current.name == 'product.education'){
      vm.tab = 3;
    }
    if($state.current.name == 'product.college'){
      vm.tab = 4;
    }    
    if($state.current.name == 'product.level'){
      vm.tab = 5;
    }
    if($state.current.name == 'product.surgery'){
      vm.tab = 6;
    }
    if($state.current.name == 'product.diagnostic'){
      vm.tab = 7;
    }
    if($state.current.name == 'product.medical'){
      vm.tab = 8;
    }
    if($state.current.name == 'product.nonmedical'){
      vm.tab = 9;
    }
    if($state.current.name == 'product.room'){
      vm.tab = 10;
    }
    if($state.current.name == 'product.surgeryUrl'){
      vm.tab = 11;
    }
    vm.selectTab = function(setTab){
      vm.tab = setTab;
    };
    vm.isSelected = function(checkTab){
      return vm.tab === checkTab;
    };
  }
})();