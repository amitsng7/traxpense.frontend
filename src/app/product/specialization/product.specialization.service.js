(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductSpecializationService', ProductSpecializationService);

  function ProductSpecializationService($http, $q, $log, ToastrService){
  	
    var putDegreeDetail = function(id, specializationName, frequency, hospital_speciality_id){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/doctor/specializations/'+id+'',
        data: 
        {
          "id": id,
          "name": specializationName,
          "frequency": frequency,
          "hospital_speciality_id": hospital_speciality_id
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

    var createDegreeDetail = function(specializationName, frequency, hospital_speciality_id){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/doctor/specialization',
        data: 
        {
          "name": specializationName,
          "frequency": frequency,
          "hospital_speciality_id": hospital_speciality_id
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
      putDegreeDetail: putDegreeDetail,
      createDegreeDetail: createDegreeDetail
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