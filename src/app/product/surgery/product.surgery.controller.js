(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductSurgeryController', ProductSurgeryController);

  /** @ngInject */
  function ProductSurgeryController($confirm, $log, $state, ProductSurgeryService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var SurgeryArray = [];
    var specialityId = [];
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.show = false;
    vm.operationClass = "editProductNotActive";
    vm.laymanNames = [];
    vm.createLaymanNames = [{'name': ""}];

    vm.showProductOperation = function(divClass){
      ProductService.showModal(divClass, vm);
    }

    vm.closeProductOperation = function(event, divClass) {
      ProductService.closeModal(event, divClass, vm);
    }

    vm.unable_link = function(degreeID){
      ProductService.unableLink(degreeID, vm);
    }

    vm.cancel = function(){
      vm.laymanNames = [];
      vm.createLaymanNames = [];
      ProductService.productOperationCancel(vm);
    }

    vm.addNewField = function(){
      ProductService.addNewField(vm);
    }

    vm.deleteField = function(index){
      ProductSurgeryService.deleteSpecialityField(vm, index);
    }

    vm.save = function(surgeryName, icdCode, level2Name, level3Name, frequency, specialityLinked){  
      var lastLevelId = (level3Name == null || level3Name == undefined) ? level2Name.id : level3Name.id
      for(var i=0; i<specialityId.length; i++){
        if(specialityLinked == specialityId[i]){
          specialityLinked = i;
        }
      }
      frequency = frequency.frequency
      ProductSurgeryService.createSurgeryDetail(surgeryName, icdCode, frequency, specialityLinked, lastLevelId)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error(data);
        vm.cancel();
        pageRefresh();
      })
    }

    vm.editProduct = function(){
      vm.surgeryName = null
      vm.icdCode = null
      vm.level2Name = null
      vm.frequency = null
      vm.specialityLinked = null
      ProductSurgeryService.editGetSurgeryDetail(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.editDetails = data;
        bindEditDetailsWithModal();
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.approve =function(surgeryName, icdCode, level2Name, level3Name, frequency, specialityLinked){
      var lastLevelId = (level3Name == null || level3Name == undefined) ? level2Name.id : level3Name.id
      for(var i=0; i<specialityId.length; i++){
        if(specialityLinked == specialityId[i]){
          specialityLinked = i;
        }
      }
      ProductSurgeryService.putEditSurgeryDetail(vm.degreeID, surgeryName, icdCode, frequency, specialityLinked, lastLevelId)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error(data);
        vm.cancel();
        pageRefresh();
      })
    }

    vm.assignSave = function(surgeryName){
      var assignSurgeryID = surgeryName.id
      ProductSurgeryService.assignSurgeryDetail(vm.degreeID, assignSurgeryID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error(data);
        vm.cancel();
        pageRefresh();
      })
    }

    vm.getLevel3List = function(level2Name){
      var level2Id = level2Name.id
      ProductSurgeryService.getLevel3List(level2Id)
      .then(function(data, status, headers, config){
        vm.level3List = data;
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.customFilter = function(selectedSurgeryLayman, filterName){
      if(selectedSurgeryLayman == null){
        return function(detail){
          return detail;
        }
      }
      if(typeof selectedSurgeryLayman != 'undefined' && filterName == 'surgeryLayman1'){
        return function(detail){
          if(detail.surgery_levels[0].level1 != "" && detail.surgery_levels[0].level1.layman_name != null){
            return detail.surgery_levels[0].level1.layman_name === selectedSurgeryLayman.surgery_levels[0].level1.layman_name
          }
        }
      }      
      if(typeof selectedSurgeryLayman != 'undefined' && filterName == 'surgeryLayman2'){
        return function(detail){
          if(detail.surgery_levels[1].level2 != "" && detail.surgery_levels[1].level2.layman_name != null){
            return detail.surgery_levels[1].level2.layman_name === selectedSurgeryLayman.surgery_levels[1].level2.layman_name
          }
        }
      }    
      if(typeof selectedSurgeryLayman != 'undefined' && filterName == 'surgeryLevel1'){
        return function(detail){
          if(detail.surgery_levels[0].level1 != "" && detail.surgery_levels[0].level1.name != null){
            return detail.surgery_levels[0].level1.name === selectedSurgeryLayman.surgery_levels[0].level1.name
          }
        }
      }    
      if(typeof selectedSurgeryLayman != 'undefined' && filterName == 'surgeryLevel2'){
        return function(detail){
          if(detail.surgery_levels[1].level2 != "" && detail.surgery_levels[1].level2.name != null){
            return detail.surgery_levels[1].level2.name === selectedSurgeryLayman.surgery_levels[1].level2.name
          }
        }
      }    
      if(typeof selectedSurgeryLayman != 'undefined' && filterName == 'surgeryLevel3'){
        return function(detail){
          if(detail.surgery_levels[2].level3 != "" && detail.surgery_levels[2].level3.name != null){
            return detail.surgery_levels[2].level3.name === selectedSurgeryLayman.surgery_levels[2].level3.name
          }
        }
      }
    }

    function pageRefresh(){
      $state.go('product.surgery', {}, {reload: true});
    }

    function bindEditDetailsWithModal(){ 
      var levelCount = vm.editDetails.surgery_levels.length
      if(levelCount > 0){
        var levelId = vm.editDetails.surgery_levels[levelCount - 1].id
        var level = vm.editDetails.surgery_levels[levelCount - 1].level
        if(level == 3){
          var levelId = vm.editDetails.surgery_levels[levelCount - 2].id
          var level = vm.editDetails.surgery_levels[levelCount - 2].level
        }
        if(level == 2){
          ProductSurgeryService.getLevel3List(levelId)
          .then(function(data, status, headers, config){
            vm.editLevel2List = data;
            concatEditData();
          },function(data, status, headers, config){
            $log.log("Failed: " + status);
          })
        }
      }
      else{
        vm.surgeryName = vm.editDetails.name
        vm.icdCode = vm.editDetails.icd
        vm.frequency = vm.editDetails.frequency
        vm.specialityLinked = vm.editDetails.speciality
      }
    }

    function concatEditData(){
      if(typeof vm.editDetails != 'undefined'){
        vm.surgeryName = vm.editDetails.name
        vm.icdCode = vm.editDetails.icd
        if(vm.editLevel2List.level == 3){
          vm.level2Name = vm.editLevel2List.parent
        }
        else{
          vm.level2Name = vm.editLevel2List
        }
        vm.frequency = vm.editDetails.frequency
        vm.specialityLinked = vm.editDetails.speciality
      }       
    }

    function modifyData(){
      for(var i=0; i<vm.details.length; i++){
        vm.SurgeryArray = [];
        if(typeof vm.details[i].surgery_levels == 'undefined' || vm.details[i].surgery_levels.length == 0){
          vm.SurgeryArray=[{'level1': ""}];
          vm.SurgeryArray= vm.SurgeryArray.concat([{'level2': ""}])
          vm.SurgeryArray= vm.SurgeryArray.concat([{'level3': ""}])
        }
        for(var j=0; j<vm.details[i].surgery_levels.length; j++){
          if(vm.details[i].surgery_levels.length == 1){
            if(vm.details[i].surgery_levels[j].level === 1){
              vm.SurgeryArray=[{'level1': vm.details[i].surgery_levels[j]}];
              vm.SurgeryArray= vm.SurgeryArray.concat([{'level2': ""}])
              vm.SurgeryArray= vm.SurgeryArray.concat([{'level3': ""}])
              vm.details[i].surgery_levels = vm.SurgeryArray
              break;  
            }
            if(vm.details[i].surgery_levels[j].level === 2){
              vm.SurgeryArray= [{'level1': ""}]
              vm.SurgeryArray= vm.SurgeryArray.concat([{'level2': vm.details[i].surgery_levels[j]}]);
              vm.SurgeryArray= vm.SurgeryArray.concat([{'level3': ""}])
              vm.details[i].surgery_levels = vm.SurgeryArray
              break;
            }
            if(vm.details[i].surgery_levels[j].level === 3){
              vm.SurgeryArray= [{'level1': ""}]
              vm.SurgeryArray= vm.SurgeryArray.concat([{'level2': ""}])
              vm.SurgeryArray= vm.SurgeryArray.concat([{'level3': vm.details[i].surgery_levels[j]}]);
              vm.details[i].surgery_levels = vm.SurgeryArray
              break;
            }
          }
          else if(vm.details[i].surgery_levels.length == 2){
            if(vm.details[i].surgery_levels[j].level === 1 && vm.details[i].surgery_levels[j+1].level == 2){
              vm.SurgeryArray=[{'level1': vm.details[i].surgery_levels[j]}];
              vm.SurgeryArray=vm.SurgeryArray.concat([{'level2': vm.details[i].surgery_levels[j+1]}]);
              vm.SurgeryArray=vm.SurgeryArray.concat([{'level3': ""}])
              vm.details[i].surgery_levels = vm.SurgeryArray
              break;
            }
            if(vm.details[i].surgery_levels[j].level === 1 && vm.details[i].surgery_levels[j+1].level == 3){
              vm.SurgeryArray=[{'level1': vm.details[i].surgery_levels[j]}];
              vm.SurgeryArray=vm.SurgeryArray.concat([{'level2': ""}])
              vm.SurgeryArray=vm.SurgeryArray.concat([{'level3': vm.details[i].surgery_levels[j+1]}]);
              vm.details[i].surgery_levels = vm.SurgeryArray
              break;
            }
            if(vm.details[i].surgery_levels[j].level === 2 && vm.details[i].surgery_levels[j+1].level == 3){
              vm.SurgeryArray=[{'level1': ""}];
              vm.SurgeryArray=vm.SurgeryArray.concat([{'level2': vm.details[i].surgery_levels[j]}])
              vm.SurgeryArray=vm.SurgeryArray.concat([{'level3': vm.details[i].surgery_levels[j+1]}]);
              vm.details[i].surgery_levels = vm.SurgeryArray
              break;
            }
          }
          else if(vm.details[i].surgery_levels.length == 3){
            vm.SurgeryArray=[{'level1': vm.details[i].surgery_levels[j]}];
            vm.SurgeryArray=vm.SurgeryArray.concat([{'level2': vm.details[i].surgery_levels[j+1]}]);
            vm.SurgeryArray=vm.SurgeryArray.concat([{'level3': vm.details[i].surgery_levels[j+2]}]);
            vm.details[i].surgery_levels = vm.SurgeryArray
            break;
          }
        }     
        vm.details[i].surgery_levels = vm.SurgeryArray
      }
    }

    function bindSpecialityNameID(){
      for(var i=0; i<vm.specialityList.length; i++){
        specialityId[vm.specialityList[i].id] = vm.specialityList[i].name
      }
    }

    ProductSurgeryService.getSpecialityList()
    .then(function(data, status, headers, config){
      vm.specialityList = data;
      bindSpecialityNameID();
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductSurgeryService.getLevel1List()
    .then(function(data, status, headers, config){
      vm.level1List = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductSurgeryService.getLevel2List()
    .then(function(data, status, headers, config){
      vm.level2List = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductService.getSurgeryList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
      modifyData();
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();