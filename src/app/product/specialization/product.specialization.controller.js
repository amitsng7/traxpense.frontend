(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductSpecializationController', ProductSpecializationController);

  /** @ngInject */
  function ProductSpecializationController($confirm, $log, $state, ProductSpecializationService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var specialityArray = [];
    vm.show = false;
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.operationClass = "editProductNotActive";

    vm.showProductOperation = function(divClass){
      vm.specializationName = null
      vm.frequency = null
      vm.hospital_speciality_id = null
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

    vm.save = function(specializationName, frequency, hospital_speciality){
      var hospital_speciality = getHospitalSpecialityId(hospital_speciality);
      var frequency = frequency.frequency;
      ProductSpecializationService.createDegreeDetail(specializationName, frequency, hospital_speciality)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.editProduct = function(){
      for(var i=0; i<vm.details.length; i++){
        if(vm.details[i].id == vm.degreeID){
          vm.specializationName = vm.details[i].name;
          vm.frequency_selected = vm.details[i].frequency;
          vm.hospital_speciality_id = vm.details[i].hospital_speciality_id;
          break;
        }
      }
    }

    vm.approve =function(specializationName, frequency, hospital_speciality_id){
      var hospital_speciality = getHospitalSpecialityId(hospital_speciality_id);
      ProductSpecializationService.putDegreeDetail(vm.degreeID, specializationName, frequency, hospital_speciality)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    function pageRefresh(){
      $state.go('product.specialization', {}, {reload: true});
    }

    function getHospitalSpecialityId(hospital_speciality){
      for(var i=0; i<vm.hospital_speciality.length; i++){
        if(vm.hospital_speciality[i].name == hospital_speciality){
          hospital_speciality = vm.hospital_speciality[i].id
          break;
        }
      }
      return hospital_speciality;
    }

    function modifySpecialityData(){
      var speciality = vm.hospital_speciality
      for(var i=0; i<speciality.length; i++){
        specialityArray[speciality[i].id] = speciality[i].name;
      }
      for(var i=0; i<vm.details.length; i++){
        vm.details[i].hospital_speciality_id = specialityArray[vm.details[i].hospital_speciality_id]
      }
    }

    function getSpecialityList(){
      ProductService.getSpecialityList(vm)
      .then(function(data, status, headers, config){
        vm.hospital_speciality = data;
        modifySpecialityData();
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    ProductService.getSpecializationList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
      getSpecialityList();
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();