(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductDiagnosticService', ProductDiagnosticService);

  function ProductDiagnosticService($http, $q, $log, ToastrService){

    var getEditDiagnosticData = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/diagnostic_tests/'+id+''
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getAllSubcatData = function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/diagnostic_subcats'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }

    var getAllCategoriesData = function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/diagnostic_categories'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }
  	
    var putDiagnosticDetail = function(id, testName, subcategoryName, subcategoryID, categoryName, categoryID, testInstruction){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/diagnostic_tests/'+id+'',
        data: 
        {
          "name": testName,
          "verified": false,
          "instructions": testInstruction,
          "diagnostic_category_id": categoryID,
          "diagnostic_subcat_id": subcategoryID
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
    
    var putSubcategoryDetail = function(id, subcategoryName, categoryName, categoryID){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/diagnostic_subcats/'+id+'',
        data: 
        {
          "verified": false,
          "category_id": categoryID,
          "name": subcategoryName
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

    var createDiagnosticDetail = function(testName, subcategoryName, subcategoryID, categoryName, categoryID, testInstruction){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/diagnostic_tests',
        data: 
        {
          "name": testName,
          "verified": false,
          "instructions": testInstruction,
          "diagnostic_category_id": categoryID,
          "diagnostic_subcat_id": subcategoryID
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

    var createSubcategoryDetail = function(subcategoryName, categoryName, categoryID){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/diagnostic_subcats',
        data: 
        {
          "verified": false,
          "category_id": categoryID,
          "name": subcategoryName
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
      getEditDiagnosticData: getEditDiagnosticData,
      getAllSubcatData: getAllSubcatData,
      getAllCategoriesData: getAllCategoriesData,
      putDiagnosticDetail: putDiagnosticDetail,
      putSubcategoryDetail: putSubcategoryDetail,
      createDiagnosticDetail: createDiagnosticDetail,
      createSubcategoryDetail: createSubcategoryDetail,
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