(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductSpecialityController', ProductSpecialityController);

  /** @ngInject */
  function ProductSpecialityController($confirm, $log, $state, ProductSpecialityService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var SpecialityArray = [];
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.show = false;
    vm.operationClass = "editProductNotActive";
    vm.laymanNames = [];
    vm.createLaymanNames = [{'name': ""}];

    vm.showProductOperation = function(divClass){
      ProductService.showModal(divClass, vm);
    }

    vm.closeProductOperation = function(event, divClass) {
      ProductService.closeModal(event, divClass, vm);
    }

    vm.unable_link = function(degreeID){
      ProductService.unableLink(degreeID, vm);
    }

    vm.cancel = function(){
      vm.specialityName = null
      vm.laymanNames = [];
      vm.createLaymanNames = [{'name': ""}];
      ProductService.productOperationCancel(vm);
    }

    vm.addNewField = function(){
      ProductService.addNewField(vm);
    }

    vm.deleteField = function(index){
      ProductSpecialityService.deleteSpecialityField(vm, index);
    }

    vm.save = function(specialityName, createLaymanNames){
      var createLaymanName = [];
      for(var i=0; i<createLaymanNames.length ;i++){
        if(i==0){
          createLaymanName = createLaymanNames[i].name;
        }
        else{
          createLaymanName = createLaymanName.concat(", ", createLaymanNames[i].name)
        }
      }
      ProductSpecialityService.createDegreeDetail(specialityName, createLaymanName)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.editProduct = function(){
      ProductSpecialityService.editGetDegreeDetail(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.editDetails = data;
        bindEditDetailsWithModal();
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.approve =function(degName, laymanNames, newLaymanNames){
      if(newLaymanNames[0].name != ""){
        for(var i=0; i<newLaymanNames.length; i++){
          laymanNames = laymanNames.concat(newLaymanNames[i])
        }
      }
      ProductSpecialityService.putEditSpecialityDetail(vm.degreeID, degName, laymanNames)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    function pageRefresh(){
      $state.go('product.speciality', {}, {reload: true});
    }

    function bindEditDetailsWithModal(){ 
      if(typeof vm.editDetails != 'undefined'){
        vm.specialityName = vm.editDetails.name;
        vm.laymanNames = vm.editDetails.layman_terms_attributes;
      } 
    }

    function modifyData(){
      for(var i=0; i<vm.details.length; i++){
        if(vm.details[i].layman_terms.length > 0){
          var layman = "";
          for(var j=0; j<vm.details[i].layman_terms.length; j++){
            if(layman == ""){
              layman = vm.details[i].layman_terms[j]
            }
            else{
              layman = layman.concat(", ", vm.details[i].layman_terms[j])
            }
          }
          vm.details[i].layman_terms = layman
        }
        else{
          vm.details[i].layman_terms = ""
        }
      }
    }

    ProductService.getSpecialityList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
      modifyData();
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();