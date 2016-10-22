(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductMedicalController', ProductMedicalController);

  /** @ngInject */
  function ProductMedicalController($confirm, $log, $state, ProductMedicalService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var specializationArray = [];
    var subcatName;
    var catName;
    vm.show = false;
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.operationClass = "editProductNotActive";

    vm.showProductOperation = function(divClass){
      vm.equipmentName = null
      vm.subcategoryName = null
      vm.categoryName = null
      ProductService.showModal(divClass, vm);
    }

    vm.closeProductOperation = function(event, divClass) {
      ProductService.closeModal(event, divClass, vm);
    }

    vm.unable_link = function(degreeID){
      ProductService.unableLink(degreeID, vm);
    }

    vm.cancel = function(){
      ProductService.productOperationCancel(vm);
    }

    vm.tab = 1;
    vm.selectTab = function(setTab){
      vm.tab = setTab;
    };
    vm.isSelected = function(checkTab){
      return vm.tab === checkTab;
    };

    vm.search = function(detail){        
      if (vm.selectedStream === undefined || vm.selectedStream.length === 0) {
          return true;
      }
      var found = false;
      angular.forEach(detail.education_stream, function (education_stream) {          
          if (education_stream.name === vm.selectedStream) {
              found = true;
          }
      });        
      return found;
    }

    vm.saveCategory = function(categoryName){
      getCategoryId(categoryName);
      ProductMedicalService.createCategoryDetail(categoryName)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.saveSubcategory = function(facilityName, categoryName){
      getCategoryId(categoryName);
      ProductMedicalService.createSubcategoryDetail(facilityName, categoryName, vm.categoryID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.saveEquipment = function(equipmentName, subcategoryName, categoryName){
      getCategoryId(categoryName);
      getSubcatId(subcategoryName);
      ProductMedicalService.createEquipmentDetail(equipmentName, subcategoryName, vm.subcategoryID, categoryName, vm.categoryID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.editProduct = function(){
      ProductMedicalService.getEditEquipmentData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.editEquipmentData = data;
        showEditEquipmentData()
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.approveCategory =function(categoryName){
      getCategoryId(catName);
      ProductMedicalService.putCategoryDetail(categoryName, vm.categoryID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.approveFacility =function(facilityName, categoryName){
      getCategoryId(catName);
      getSubcatId(subcatName);
      ProductMedicalService.putSubcategoryDetail(vm.subcategoryID, facilityName, categoryName, vm.categoryID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.approveEquipment =function(equipmentName, facilityName, categoryName){
      getCategoryId(catName);
      getSubcatId(subcatName);
      ProductMedicalService.putEquipmentDetail(vm.degreeID, equipmentName, facilityName, vm.subcategoryID, categoryName, vm.categoryID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.assignSave = function(nonmedicalName){
      var assignNonMedicalID = nonmedicalName.id
      ProductMedicalService.assignNonMedicalDetail(vm.degreeID, assignNonMedicalID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.deleteProduct = function(){
      ProductMedicalService.getDeleteNonMedicalData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.deleteNonMedicalData = data;
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    function pageRefresh(){
      $state.go('product.medical', {}, {reload: true});
    }

    function getCategoryId(categoryName){
      for(var i=0; i<vm.medical_cats.length; i++){
        if(categoryName == vm.medical_cats[i].name){
          vm.categoryID = vm.medical_cats[i].id
        }
      }
    }

    function getSubcatId(subcategoryName){
      for(var i=0; i<vm.medical_subcats.length; i++){
        if(subcategoryName == vm.medical_subcats[i].name && vm.medical_subcats[i] != null){
          vm.subcategoryID = vm.medical_subcats[i].id
        }
      }
    }

    function showEditEquipmentData(){
      vm.categoryName = vm.editEquipmentData.medical_category.name; 
      vm.facilityName = vm.editEquipmentData.medical_sub_category.name; 
      vm.equipmentName = vm.editEquipmentData.name; 
      catName = vm.editEquipmentData.medical_category.name; 
      subcatName = vm.editEquipmentData.medical_sub_category.name; 
    }

    function getNonMedicalFacilityId(nonmedicalName){
      for(var i=0; i<vm.non_medical_data.length; i++){
        if(vm.non_medical_data[i].name == nonmedicalName){
          nonmedicalName = vm.non_medical_data[i].id
          break;
        }
      }
      return nonmedicalName;
    }

    function modifyData(){
      for(var i=0; i<vm.details.length; i++){
        if(vm.details[i].medical_sub_category == null){
          vm.details[i].medical_sub_category = [{'id': '', 'name': ''}];
        }
      }
    }

    ProductMedicalService.getAllSubcatData()
    .then(function(data, status, headers, config){
      vm.medical_subcats = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductMedicalService.getAllCategoriesData()
    .then(function(data, status, headers, config){
      vm.medical_cats = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductService.getMedicalList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
      modifyData();
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();