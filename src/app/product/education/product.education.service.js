(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductEducationService', ProductEducationService);

  function ProductEducationService($http, $q, $log, ToastrService){
  	
    var putDegreeDetail = function(id, degName, degAbbreviation, specialization, speciality_type_id, level, frequency, prefix, typeOfEducation){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/degrees/'+id+'',
        data: 
        {
          "id": id,
          "name": degName,
          "abbreviation": degAbbreviation,
          "specialization_id": specialization,
          "speciality_type_id": speciality_type_id,
          "frequency": frequency,
          "level": level,
          "prefix": prefix,
          "education_type_id": typeOfEducation
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

    var createDegreeDetail = function(degName, degAbbreviation, specialization, speciality_type_id, level, frequency, prefix, typeOfEducation){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/degrees',
        data: 
        {
          "name": degName,
          "abbreviation": degAbbreviation,
          "specialization_id": specialization,
          "speciality_type_id": speciality_type_id,
          "frequency": frequency,
          "level": level,
          "prefix": prefix,
          "education_type_id": typeOfEducation
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

    var assignDegreeDetail = function(degreeID, assignDegreeId){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/degree/'+degreeID+'/assign/'+assignDegreeId+''
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
      createDegreeDetail: createDegreeDetail,
      assignDegreeDetail: assignDegreeDetail
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