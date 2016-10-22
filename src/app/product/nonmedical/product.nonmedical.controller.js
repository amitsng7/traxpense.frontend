(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductNonMedicalController', ProductNonMedicalController);

  /** @ngInject */
  function ProductNonMedicalController($confirm, $log, $state, ProductNonMedicalService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var specializationArray = [];
    vm.show = false;
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.operationClass = "editProductNotActive";

    vm.showProductOperation = function(divClass){
      vm.nonmedicalName = null
      ProductService.showModal(divClass, vm);
    }

    vm.closeProductOperation = function(event, divClass) {
      ProductService.closeModal(event, divClass, vm);
    }

    vm.unable_link = function(degreeID){
      ProductService.unableLink(degreeID, vm);
    }

    vm.cancel = function(){
      ProductService.productOperationCancel(vm);
    }

    vm.search = function(detail){        
      if (vm.selectedStream === undefined || vm.selectedStream.length === 0) {
          return true;
      }
      var found = false;
      angular.forEach(detail.education_stream, function (education_stream) {          
          if (education_stream.name === vm.selectedStream) {
              found = true;
          }
      });        
      return found;
    }

    vm.save = function(nonmedicalName){
      ProductNonMedicalService.createNonMedicalDetail(nonmedicalName)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.editProduct = function(){
      ProductNonMedicalService.getEditNonMedicalData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.editNonMedicalData = data;
        showEditNonMedicalData()
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.approve =function(nonmedicalName){
      ProductNonMedicalService.putNonMedicalDetail(vm.degreeID, nonmedicalName)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.assignSave = function(nonmedicalName){
      var assignNonMedicalID = nonmedicalName.id
      ProductNonMedicalService.assignNonMedicalDetail(vm.degreeID, assignNonMedicalID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.deleteProduct = function(){
      ProductNonMedicalService.getDeleteNonMedicalData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.deleteNonMedicalData = data;
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    function pageRefresh(){
      $state.go('product.nonmedical', {}, {reload: true});
    }

    function showEditNonMedicalData(){
      vm.nonmedicalName = vm.editNonMedicalData.name;  
    }

    function getNonMedicalFacilityId(nonmedicalName){
      for(var i=0; i<vm.non_medical_data.length; i++){
        if(vm.non_medical_data[i].name == nonmedicalName){
          nonmedicalName = vm.non_medical_data[i].id
          break;
        }
      }
      return nonmedicalName;
    }

    ProductNonMedicalService.getAllNonMedicalData()
    .then(function(data, status, headers, config){
      vm.non_medical_data = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductService.getNonMedicalList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();