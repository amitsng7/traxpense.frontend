(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductService', ProductService);

  function ProductService($http, $q){
    var showModal = function(div, vm){
      if(div == 'create'){
        vm.createValue = true;
        vm.degreeName = null;
        vm.degreeAbbreviation = null;
        vm.specialization_name = null;
        vm.level_selected = null;
        vm.frequency_selected = null;
        vm.laymanNames = [];
        vm.createLaymanNames = [{'name': ""}];
        vm.degreeName = null
        vm.degAbbreviation = null
        vm.specialization = null
        vm.speciality_type_id = null
        vm.level = null
        vm.frequency = null
        vm.prefix = null
        vm.typeOfEducation = null
      }
      if(div == 'edit' && vm.checked == true){
        vm.laymanNames = [];
        vm.createLaymanNames = [{'name': ""}];
        vm.editValue = true;
      }
      if(div == 'assign' && vm.checked == true){
        vm.assignValue = true;
      }
      if(div == 'delete' && vm.checked == true){
        vm.deleteValue = true;
      }
    }

    var closeModal = function(event, div, vm){
      var div_eventTrigger = event.target.className;
      var div_eventTrigger = div_eventTrigger.split(" ");
      var div_eventTrigger = div_eventTrigger[0];
      if (div == div_eventTrigger) {
          vm.createValue = false;
          vm.checked = false;
        }
        if (div == div_eventTrigger) {
          vm.editValue = false;
          vm.checked = false;
          vm.operationClass = "editProductNotActive";
        }
        if (div == div_eventTrigger) {
          vm.assignValue = false;
          vm.checked = false;
          vm.operationClass = "editProductNotActive";
        }
        if (div == div_eventTrigger) {
          vm.deleteValue = false;
          vm.checked = false;
          vm.operationClass = "editProductNotActive";
        }
        var ele = document.getElementsByName("choose");
        for(var i=0;i<ele.length;i++){
          ele[i].checked = false;
        }
        if(div_eventTrigger =='createNewProductModal'){
          vm.createLaymanNames = [{'name': ""}];
        }
    }

    var unableLink = function(degID, vm){
      vm.degreeID = degID;
      vm.operationClass = "editProductActive";
      vm.checked = true;
    }

    var productOperationCancel = function(vm){
      vm.createValue = false;
      vm.editValue = false;
      vm.checked = false;
      vm.assignValue =false;
      vm.deleteValue =false;
      vm.operationClass = "editProductNotActive";
      vm.laymanNames = [{id: 'choice1'}];
    }

    var addNewField = function(vm){
      var newItemNo = vm.laymanNames.length+1;
      vm.createLaymanNames.push({'name':''});
    }

    var deleteField = function(vm){
      if(vm.laymanNames.length > 1){
        var lastItem = vm.laymanNames.length-1;
        vm.laymanNames.splice(lastItem);
      }
    }

    var getSpecialityList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/hospital_specialities'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getDegreeList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/degrees'
      })
      .success(function(data, status, headers, config) {
        vm.show = false
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getSpecializationList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/doctor/specializations'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }
    
    var getSpecialityTypesData = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/speciality_types'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show =false;
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getCollegeList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/colleges'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getNonMedicalList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/non_medical_facilities'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getRoomAmenitiesList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/amenities'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getDiagnosticTestsList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/diagnostic_tests'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getMedicalList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/equipment'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getSurgeryList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/surgeries'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }    

    var getLevel1List = function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/surgery_levels?level=1'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }    

    var getLevelsList = function(vm){
      vm.show = true
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/surgery_levels?level=2'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
        vm.show = false
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }
    
    return{
      showModal: showModal,
      closeModal: closeModal,
      unableLink: unableLink,
      productOperationCancel: productOperationCancel,
      addNewField: addNewField,
      deleteField: deleteField,
      getSpecialityList: getSpecialityList,
      getDegreeList: getDegreeList,
      getSpecializationList: getSpecializationList,
      getCollegeList: getCollegeList,
      getSpecialityTypesData: getSpecialityTypesData,
      getNonMedicalList: getNonMedicalList,
      getRoomAmenitiesList: getRoomAmenitiesList,
      getDiagnosticTestsList: getDiagnosticTestsList,
      getMedicalList: getMedicalList,
      getSurgeryList: getSurgeryList,
      getLevelsList: getLevelsList,
      getLevel1List: getLevel1List
    }  
  }  
})();