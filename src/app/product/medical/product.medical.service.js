(function(){
  'use strict';
  angular.module('productAdmin')
    .factory('ProductMedicalService', ProductMedicalService);

  function ProductMedicalService($http, $q, $log, ToastrService){

    var getEditEquipmentData = function(id){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/v1/product/equipment/'+id+''
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
        url: 'api/v1/product/medical_sub_categories'
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
        url: 'api/v1/product/medical_categories'
      })
      .success(function(data, status, headers, config) {
        deferred.resolve(data);
      })
      .error(function(data) {
        deferred.reject("Failed to get data: " + data);
      })
      return deferred.promise;
    }
  	
    var putCategoryDetail = function(categoryName, id){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/medical_categories/'+id+'',
        data: 
        {
          "name": categoryName,
          "verified": false
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
        url: 'api/v1/product/medical_sub_categories/'+id+'',
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
    
    var putEquipmentDetail = function(id, equipmentName, facilityName, subcategoryID, categoryName, categoryID){
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: 'api/v1/product/equipment/'+id+'',
        data: 
        {
          "verified": false,
          "name": equipmentName,
          "medical_category_id": categoryID,
          "medical_sub_category_id": subcategoryID
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

    var createCategoryDetail = function(categoryName){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/medical_categories',
        data: 
        {
          "name": categoryName,
          "verified": false
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

    var createSubcategoryDetail = function(facilityName, categoryName, categoryID){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/medical_sub_categories',
        data: 
        {
          "verified": false,
          "parent_id": categoryID,
          "name": facilityName
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

    var createEquipmentDetail = function(equipmentName, subcategoryName, subcategoryID, categoryName, categoryID){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/v1/product/equipment',
        data: 
        {
          "verified": false,
          "medical_category_id": categoryID,
          "name": equipmentName,
          "medical_sub_category_id": subcategoryID
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
      getEditEquipmentData: getEditEquipmentData,
      getAllSubcatData: getAllSubcatData,
      getAllCategoriesData: getAllCategoriesData,
      putCategoryDetail: putCategoryDetail,
      putSubcategoryDetail: putSubcategoryDetail,
      putEquipmentDetail: putEquipmentDetail,
      createCategoryDetail: createCategoryDetail,
      createSubcategoryDetail: createSubcategoryDetail,
      createEquipmentDetail: createEquipmentDetail,
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