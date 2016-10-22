(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductRoomController', ProductRoomController);

  /** @ngInject */
  function ProductRoomController($confirm, $log, $state, ProductRoomService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var specializationArray = [];
    vm.show = false;
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.operationClass = "editProductNotActive";

    vm.showProductOperation = function(divClass){
      vm.roomName = null
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

    vm.save = function(roomName){
      ProductRoomService.createRoomAmenitiesDetail(roomName)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.editProduct = function(){
      ProductRoomService.getEditRoomAmenitiesData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.editRoomAmenitiesData = data;
        showEditRoomAmenitiesData()
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.approve =function(roomName){
      ProductRoomService.putRoomAmenitiesDetail(vm.degreeID, roomName)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.assignSave = function(roomName){
      var assignRoomAmenitiesID = roomName.id
      ProductRoomService.assignRoomAmenitiesDetail(vm.degreeID, assignRoomAmenitiesID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.deleteProduct = function(){
      ProductRoomService.getDeleteRoomAmenitiesData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.deleteRoomAmenitiesData = data;
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    function pageRefresh(){
      $state.go('product.room', {}, {reload: true});
    }

    function showEditRoomAmenitiesData(){
      vm.roomName = vm.editRoomAmenitiesData.name;  
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

    // ProductRoomService.getAllNonMedicalData()
    // .then(function(data, status, headers, config){
    //   vm.non_medical_data = data;
    // },function(data, status, headers, config){
    //   $log.log("Failed: " + status);
    // })

    ProductService.getRoomAmenitiesList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();