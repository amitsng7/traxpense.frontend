(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductNonMedicalService', ProductNonMedicalService);

  function ProductNonMedicalService($http, $q, $log, ToastrService){

    var getEditNonMedicalData = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/non_medical_facilities/'+id+''
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getAllNonMedicalData = function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/non_medical_facilities'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }
  	
    var putNonMedicalDetail = function(id, nonmedicalName){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/non_medical_facilities/'+id+'',
        data: 
        {
          "name": nonmedicalName,
        }
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var createNonMedicalDetail = function(nonmedicalName){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/non_medical_facilities',
        data: 
        {
          "name": nonmedicalName
        }
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var assignNonMedicalDetail = function(ID, assignNonMedicalId){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/non_medical_facilities/'+ID+'/assign',
        data:{
          "target_id" : assignNonMedicalId
        }
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getDeleteNonMedicalData = function(ID){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/non_medical_facilities/'+ID+'/dependencies'
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
      getEditNonMedicalData: getEditNonMedicalData,
      getAllNonMedicalData: getAllNonMedicalData,
      putNonMedicalDetail: putNonMedicalDetail,
      createNonMedicalDetail: createNonMedicalDetail,
      assignNonMedicalDetail: assignNonMedicalDetail,
      getDeleteNonMedicalData: getDeleteNonMedicalData
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
  }
})();