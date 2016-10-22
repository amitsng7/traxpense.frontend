(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductLevelController', ProductLevelController);

  /** @ngInject */
  function ProductLevelController($confirm, $log, $state, ProductLevelService, ProductService, LoginService, ToastrService){
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
      vm.level1Name = null
      vm.level2Name = null
      vm.level1Layman = null
      vm.level2Layman = null
      vm.lastLevel1Name = null
      vm.lastLevel2Name = null
      ProductService.showModal(divClass, vm);
    }

    vm.closeProductOperation = function(event, divClass) {
      ProductService.closeModal(event, divClass, vm);
    }

    vm.unable_link = function(level1ID, level2ID, level3ID){
      ProductLevelService.unableLink(level1ID, level2ID, level3ID, vm);
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

    vm.saveLevel1 = function(Level, Name, LaymanName){
      ProductLevelService.createLevel1Detail(Level, Name, LaymanName)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.saveLevel2 = function(Level, Name, LaymanName, lastLevel){      
      for(var i=0; i<vm.level1.length; i++){
        if(lastLevel == vm.level1[i].name){
          lastLevel = vm.level1[i].id
        }
      }
      ProductLevelService.createLevel2Detail(Level, Name, LaymanName, lastLevel)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.saveLevel3 = function(Level, Name, lastLevel){
      for(var i=0; i<vm.details.length; i++){
        if(lastLevel == vm.details[i].name){
          lastLevel = vm.details[i].id
        }
      }
      ProductLevelService.createLevel3Detail(Level, Name, lastLevel)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.editProduct = function(){
      ProductLevelService.getEditLevelData(vm.level2ID)
      .then(function(data, status, headers, config){
        vm.editLevelData = data;
        showEditLevelData()
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.approveLevel1 =function(Name, Layman){
      ProductLevelService.putLevel1Detail(1, vm.level1ID, Name, Layman)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.approveLevel2 =function(Name, Layman, lastLevel){
      for(var i=0; i<vm.level1.length; i++){
        if(lastLevel == vm.level1[i].name){
          lastLevel = vm.level1[i].id
        }
      }
      ProductLevelService.putLevel2Detail(2, vm.level2ID, Name, Layman, lastLevel)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.approveLevel3 =function(Name, lastLevel){
      for(var i=0; i<vm.details.length; i++){
        if(lastLevel == vm.details[i].name){
          lastLevel = vm.details[i].id
        }
      }
      ProductLevelService.putLevel3Detail(3, vm.level3ID, Name, lastLevel)
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
      ProductLevelService.assignNonMedicalDetail(vm.degreeID, assignNonMedicalID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.deleteProduct = function(){
      ProductLevelService.getDeleteNonMedicalData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.deleteNonMedicalData = data;
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.customFilter = function(selectedLevel, filterName){
      if(selectedLevel == null){
        return function(detail){
          return detail;
        }
      }
      if(typeof selectedLevel != 'undefined' && filterName == 'level1Name'){
        return function(detail){
          if(detail.parent != null && detail.parent.name != null){
            return detail.parent.name === selectedLevel.parent.name
          }
        }
      }
      if(typeof selectedLevel != 'undefined' && filterName == 'level1Layman'){
        return function(detail){
          if(detail.parent != null && detail.parent.layman_name != null){
            return detail.parent.layman_name === selectedLevel.parent.layman_name
          }
        }
      }
    }

    function pageRefresh(){
      $state.go('product.level', {}, {reload: true});
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

    function showEditLevelData(){
      vm.level2Name = vm.editLevelData.name
      vm.level2Layman = vm.editLevelData.layman_name
      if(vm.editLevelData.parent != null){
        vm.level1Name = vm.editLevelData.parent.name
        vm.level1Layman = vm.editLevelData.parent.layman_name
        vm.lastLevel1Name = vm.editLevelData.parent.name
      }
      if(vm.editLevelData.children.length > 0){
        for(var i=0; i<vm.editLevelData.children.length; i++){
          if(vm.level3ID == vm.editLevelData.children[i].id){
            vm.level3Name = vm.editLevelData.children[i].name
            vm.lastLevel2Name = vm.editLevelData.name
          }
        }
      }
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
      var count = 0;
      vm.modifyDetails = []
      for(var i=0; i<vm.details.length; i++){
        var childLength = vm.details[i].children.length
        if(vm.details[i].children.length > 0){          
          for(var j=0; j<childLength; j++){
            vm.modifyDetails[count] = {'id': vm.details[i].id, 'name': vm.details[i].name, 'layman_name': vm.details[i].layman_name, 'level': vm.details[i].level, 'parent': vm.details[i].parent, 'children': [vm.details[i].children[j]]}
            count = count+1;
          }
        }
        else{
          vm.modifyDetails[count] = vm.details[i]
        }
        count = count+1;
      }
    }

    ProductService.getLevel1List()
    .then(function(data, status, headers, config){
      vm.level1 = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductService.getLevelsList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
      modifyData();
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();