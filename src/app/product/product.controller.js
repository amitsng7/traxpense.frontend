(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductController', ProductController);

  /** @ngInject */
  function ProductController($state, $scope, $stateParams, ProductService) {
    $scope.currentState = $state.$current.name
    if($scope.currentState === 'product'){
	   $state.go('product.speciality');	    
    }
  }
})();
  