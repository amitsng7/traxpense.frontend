(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductSpecialityService', ProductSpecialityService);

  function ProductSpecialityService($http, $q, $log, ToastrService){

    var deleteSpecialityField = function(vm, index){
      if(vm.laymanNames.length > 1){
        vm.laymanNames[index]._destroy = true;
      }
    }

    var createDegreeDetail = function(specialityName, createLaymanName){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/hospital_specialities',
        data: 
        {
          "name": specialityName,
          "layman_terms": createLaymanName
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

    var editGetDegreeDetail = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/hospital_specialities/'+id+'',
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var putEditSpecialityDetail = function(id, degName, laymanNames){
      console.log(laymanNames)
      console.log(degName)
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/hospital_specialities/'+id+'',
        data: 
        {
          "id": id,
          "name": degName,
          "layman_terms_attributes": laymanNames
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
      deleteSpecialityField: deleteSpecialityField,
      createDegreeDetail: createDegreeDetail,
      editGetDegreeDetail: editGetDegreeDetail,
      putEditSpecialityDetail: putEditSpecialityDetail
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