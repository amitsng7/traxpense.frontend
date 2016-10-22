(function(){
  'use strict';
  angular.module('productAdmin')
  .factory('ToastrService', ToastrService)
    .factory('ProductSurgeryService', ProductSurgeryService);

  function ProductSurgeryService($http, $q, $log){

    var deleteSpecialityField = function(vm, index){
      if(vm.laymanNames.length > 1){
        vm.laymanNames[index]._destroy = true;
      }
    }

    var createSurgeryDetail = function(surgeryName, icdCode, frequency, specialityLinked, lastLevelId){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/surgeries',
        data: 
        {
          "name": surgeryName,
          "icd": icdCode,
          "frequency": frequency,
          "hospital_speciality_id": specialityLinked,
          "last_level_surgery_level_id": lastLevelId
        }
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data.info);
      })
      return deferred.promise;
    }

    var editGetSurgeryDetail = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/surgeries/'+id+'',
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var putEditSurgeryDetail = function(id, surgeryName, icdCode, frequency, specialityLinked, lastLevelId){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/surgeries/'+id+'',
        data: 
        {
          "name": surgeryName,
          "icd": icdCode,
          "frequency": frequency,
          "hospital_speciality_id": specialityLinked,
          "last_level_surgery_level_id": lastLevelId
        }
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data, status, headers, config) {
        deferred.reject("Failed to get data: " + data.info);
      })
      return deferred.promise;
    }

    var assignSurgeryDetail = function(ID, assignSurgeryId){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/surgeries/'+ID+'/assign',
        data:{
          "assignable_surgery_id" : assignSurgeryId
        }
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {        
        deferred.reject("Failed to get data: " + data.info);
      })
      return deferred.promise;
    }

    var getSpecialityList = function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/hospital_specialities'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
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

    var getLevel2List = function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/surgery_levels?level=2'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getLevel3List = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/surgery_levels/'+id+''
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    return{
      deleteSpecialityField: deleteSpecialityField,
      createSurgeryDetail: createSurgeryDetail,
      editGetSurgeryDetail: editGetSurgeryDetail,
      putEditSurgeryDetail: putEditSurgeryDetail,
      assignSurgeryDetail: assignSurgeryDetail,
      getSpecialityList: getSpecialityList,
      getLevel1List: getLevel1List,
      getLevel2List: getLevel2List,
      getLevel3List: getLevel3List
  	}  
  }
  
  
    function ToastrService(toastr) {
      return {
          success: function (message,title) {
            toastr["success"](message,title);
          },
          error: function (message,title) {
            toastr["error"](message,title);
          }
      };
    }; 
})();