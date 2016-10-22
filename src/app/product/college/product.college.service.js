(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductCollegeService', ProductCollegeService);

  function ProductCollegeService($http, $q, $log, ToastrService){

    var getEditCollegeData = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/colleges/'+id+''
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }
    getEducationStreamData

    var getEducationStreamData = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api//v1/product/education_streams'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }
  	
    var putCollegeDetail = function(id, collegeName, education_stream){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/colleges/'+id+'',
        data: 
        {
          "name": collegeName,
          "education_stream_id": education_stream
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

    var createCollegeDetail = function(collegeName, educationStream){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/colleges',
        data: 
        {
          "name": collegeName,
          "education_stream_id": educationStream
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

    var assignCollegeDetail = function(ID, assignCollegeId){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/colleges/'+ID+'/assign',
        data:{
          "target_id" : assignCollegeId
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

    var getDeleteCollegeData = function(ID){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/colleges/'+ID+'/dependencies'
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
      getEditCollegeData: getEditCollegeData,
      getEducationStreamData: getEducationStreamData,
      putCollegeDetail: putCollegeDetail,
      createCollegeDetail: createCollegeDetail,
      assignCollegeDetail: assignCollegeDetail,
      getDeleteCollegeData: getDeleteCollegeData
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