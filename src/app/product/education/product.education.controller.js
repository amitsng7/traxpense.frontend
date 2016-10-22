(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductEducationController', ProductEducationController)
    .filter('unique, unique');

  /** @ngInject */
  function ProductEducationController($confirm, $log, $state, ProductEducationService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var specializationArray = [];
    var specialityArray = [];
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.operationClass = "editProductNotActive";
    vm.show = false

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
      ProductService.productOperationCancel(vm);
    }

    vm.save = function(degName, degAbbreviation, specialization, speciality_type_id, level, frequency, prefix, typeOfEducation){
      for(var i=0; i<specializationArray.length; i++){
        if(specialization == specializationArray[i]){
          var specialization = i;
        }
      }
      var speciality_type_id = speciality_type_id;
      for(var i=0; i<specialityArray.length; i++){
        if(speciality_type_id == specialityArray[i]){
          var speciality_type_id = i;
        }
      }
      var level = level;
      var frequency = frequency;
      var prefix = prefix;
      var typeOfEducation = typeOfEducation;
      for(var i=0; i<specialityArray.length; i++){
        if(typeOfEducation == specialityArray[i]){
          var typeOfEducation = i;
        }
      }
      ProductEducationService.createDegreeDetail(degName, degAbbreviation, specialization, speciality_type_id, level, frequency, prefix, typeOfEducation)
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
          vm.degreeName = vm.details[i].name;
          vm.degreeAbbreviation = vm.details[i].abbreviation;
          vm.specialization_name = vm.details[i].specialization_id;
          vm.speciality_type_id = vm.details[i].speciality_type_id;
          vm.level = vm.details[i].level;
          vm.frequency = vm.details[i].frequency;
          vm.prefix = vm.details[i].prefix;
          vm.education_type_id = vm.details[i].education_type_id;
          break;
        }
      }
    }

    vm.approve =function(degName, degAbbreviation, specialization, speciality_type_id, level, frequency, prefix, typeOfEducation){
      for(var i=0; i<specializationArray.length; i++){
        if(specialization == specializationArray[i]){
          var specialization = i;
        }
      }
      var speciality_type_id = speciality_type_id;
      for(var i=0; i<specialityArray.length; i++){
        if(speciality_type_id == specialityArray[i]){
          var speciality_type_id = i;
        }
      }
      var level = level;
      var frequency = frequency;
      var prefix = prefix;
      var typeOfEducation = typeOfEducation;
      for(var i=0; i<specialityArray.length; i++){
        if(typeOfEducation == specialityArray[i]){
          var typeOfEducation = i;
        }
      }
      ProductEducationService.putDegreeDetail(vm.degreeID, degName, degAbbreviation, specialization, speciality_type_id, level, frequency, prefix, typeOfEducation)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.assignSave = function(degreeName){
      var assignDegreeID = degreeName.id
      ProductEducationService.assignDegreeDetail(vm.degreeID, assignDegreeID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    function pageRefresh(){
      $state.go('product.education', {}, {reload: true});
    }

    function modifyData(){
      var specialization = vm.specializationList
      for(var i=0; i<specialization.length; i++){
        specializationArray[specialization[i].id] = specialization[i].name;
      }
      for(var i=0; i<vm.details.length; i++){
        vm.details[i].specialization_id = specializationArray[vm.details[i].specialization_id]
      }
    }

    function modifySpecialityData(){
      var speciality = vm.speciality
      for(var i=0; i<speciality.length; i++){
        specialityArray[speciality[i].id] = speciality[i].name;
      }
      for(var i=0; i<vm.details.length; i++){
        vm.details[i].education_type_id = specialityArray[vm.details[i].education_type_id]
        vm.details[i].speciality_type_id = specialityArray[vm.details[i].speciality_type_id]
      }
    }

    function getSpecializationData(){
      ProductService.getSpecializationList(vm)
      .then(function(data, status, headers, config){
        vm.specializationList = data;
        modifyData();
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    function getSpecialityTypeData(){
      ProductService.getSpecialityTypesData(vm)
      .then(function(data, status, headers, config){
        vm.speciality = data;
        modifySpecialityData();
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    ProductService.getDegreeList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
      getSpecializationData();
      getSpecialityTypeData();
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();
