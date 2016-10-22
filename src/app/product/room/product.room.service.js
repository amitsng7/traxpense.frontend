(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductRoomService', ProductRoomService);

  function ProductRoomService($http, $q, $log, ToastrService){

    var getEditRoomAmenitiesData = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/amenities/'+id+''
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }
  	
    var putRoomAmenitiesDetail = function(id, nonmedicalName){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/amenities/'+id+'',
        data: 
        {
          "name": nonmedicalName,
          "verified": true
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

    var createRoomAmenitiesDetail = function(roomName){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/amenities',
        data: 
        {
          "name": roomName,
          "verified": true
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

    var assignRoomAmenitiesDetail = function(ID, assignRoomAmenitiesId){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/amenities/'+ID+'/assign',
        data:{
          "target_id" : assignRoomAmenitiesId
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

    var getDeleteRoomAmenitiesData = function(ID){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/amenities/'+ID+'/dependencies'
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
      getEditRoomAmenitiesData: getEditRoomAmenitiesData,
      // getAllNonMedicalData: getAllNonMedicalData,
      putRoomAmenitiesDetail: putRoomAmenitiesDetail,
      createRoomAmenitiesDetail: createRoomAmenitiesDetail,
      assignRoomAmenitiesDetail: assignRoomAmenitiesDetail,
      getDeleteRoomAmenitiesData: getDeleteRoomAmenitiesData
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