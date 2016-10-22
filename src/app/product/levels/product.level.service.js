
(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductLevelService', ProductLevelService);

  function ProductLevelService($http, $q, $log, ToastrService){

    var unableLink = function(level1ID, level2ID, level3ID, vm){
      vm.level1ID = level1ID;
      vm.level2ID = level2ID;
      vm.level3ID = level3ID;
      vm.operationClass = "editProductActive";
      vm.checked = true;
    }

    var getEditLevelData = function(id){
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
  	
    var putLevel1Detail = function(level, id, Name, Layman){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/surgery_levels/'+id+'',
        data: 
        {
          "level": level,
          "name": Name,
          "layman_name": Layman
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
    
    var putLevel2Detail = function(level, id, Name, Layman, lastLevelId){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/surgery_levels/'+id+'',
        data: 
        {
          "level": level,
          "name": Name,
          "layman_name": Layman,
          "parent_surgery_level_id": lastLevelId
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
    
    var putLevel3Detail = function(level, id, Name, lastLevelId){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/surgery_levels/'+id+'',
        data: 
        {
          "level": level,
          "name": Name,
          "parent_surgery_level_id": lastLevelId
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

    var createLevel1Detail = function(level, name, layman){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/surgery_levels',
        data: 
        {
          "name": name,
          "layman_name": layman,
          "level":level
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

    var createLevel2Detail = function(level, name, layman, lastLevel){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/surgery_levels',
        data: 
        {
          "name": name,
          "layman_name": layman,
          "level":level,
          "parent_surgery_level_id": lastLevel
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

    var createLevel3Detail = function(level, name, lastLevel){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/surgery_levels',
        data: 
        {
          "name": name,
          "level":level,
          "parent_surgery_level_id": lastLevel
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

    return{
      unableLink: unableLink,
      getEditLevelData: getEditLevelData,
      putLevel1Detail: putLevel1Detail,
      putLevel2Detail: putLevel2Detail,
      putLevel3Detail: putLevel3Detail,
      createLevel1Detail: createLevel1Detail,
      createLevel2Detail: createLevel2Detail,
      createLevel3Detail: createLevel3Detail,
      assignNonMedicalDetail: assignNonMedicalDetail
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