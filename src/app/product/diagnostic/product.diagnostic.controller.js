(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductDiagnosticController', ProductDiagnosticController);

  /** @ngInject */
  function ProductDiagnosticController($confirm, $log, $state, ProductDiagnosticService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var specializationArray = [];
    var subcatName;
    vm.show = false
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.operationClass = "editProductNotActive";

    vm.showProductOperation = function(divClass){
      vm.testName = null
      vm.subcategoryName = null
      vm.categoryName = null
      vm.testInstruction = null
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

    vm.saveDiagnostic = function(testName, subcategoryName, categoryName, testInstruction){
      getCategoryId(categoryName);
      getSubcatId(subcategoryName);
      ProductDiagnosticService.createDiagnosticDetail(testName, subcategoryName, vm.subcategoryID, categoryName, vm.categoryID, testInstruction)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.saveSubcategory = function(subcategoryName, categoryName){
      getCategoryId(categoryName);
      ProductDiagnosticService.createSubcategoryDetail(subcategoryName, categoryName, vm.categoryID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.editProduct = function(){
      ProductDiagnosticService.getEditDiagnosticData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.editDiagnosticData = data;
        showEditDiagnosticData()
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.approveDiagnostic =function(testName, subcategoryName, categoryName, testInstruction){
      getCategoryId(categoryName);
      getSubcatId(subcategoryName);
      ProductDiagnosticService.putDiagnosticDetail(vm.degreeID, testName, subcategoryName, vm.subcategoryID, categoryName, vm.categoryID, testInstruction)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.approveSubcategory =function(subcategoryName, categoryName){
      getCategoryId(categoryName);
      getSubcatId(subcatName);
      ProductDiagnosticService.putSubcategoryDetail(vm.subcategoryID, subcategoryName, categoryName, vm.categoryID)
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
      ProductDiagnosticService.assignNonMedicalDetail(vm.degreeID, assignNonMedicalID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.deleteProduct = function(){
      ProductDiagnosticService.getDeleteNonMedicalData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.deleteNonMedicalData = data;
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    function pageRefresh(){
      $state.go('product.diagnostic', {}, {reload: true});
    }

    function getCategoryId(categoryName){
      for(var i=0; i<vm.diagnostic_cats.length; i++){
        if(categoryName == vm.diagnostic_cats[i].name){
          vm.categoryID = vm.diagnostic_cats[i].id
        }
      }
    }

    function getSubcatId(subcategoryName){
      for(var i=0; i<vm.diagnostic_subcats.length; i++){
        if(subcategoryName == vm.diagnostic_subcats[i].name && vm.diagnostic_subcats[i] != null){
          vm.subcategoryID = vm.diagnostic_subcats[i].id
        }
      }
    }

    function showEditDiagnosticData(){
      vm.testName = vm.editDiagnosticData.name; 
      if(vm.editDiagnosticData.diagnostic_subcat != undefined){
        vm.subcategoryName = vm.editDiagnosticData.diagnostic_subcat.name; 
      }
      vm.categoryName = vm.editDiagnosticData.diagnostic_category.name; 
      vm.testInstruction = vm.editDiagnosticData.instructions; 
      subcatName = vm.editDiagnosticData.diagnostic_subcat.name; 
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
        if(vm.details[i].diagnostic_subcat == null){
          vm.details[i].diagnostic_subcat = [{'id': '', 'name': ''}];
        }
      }
    }

    ProductDiagnosticService.getAllSubcatData()
    .then(function(data, status, headers, config){
      vm.diagnostic_subcats = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductDiagnosticService.getAllCategoriesData()
    .then(function(data, status, headers, config){
      vm.diagnostic_cats = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductService.getDiagnosticTestsList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
      modifyData();
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();