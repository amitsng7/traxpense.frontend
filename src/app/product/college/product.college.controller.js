(function() {
  'use strict';

  angular
    .module('productAdmin')
    .controller('ProductCollegeController', ProductCollegeController);

  /** @ngInject */
  function ProductCollegeController($confirm, $log, $state, ProductCollegeService, ProductService, LoginService, ToastrService){
  	var vm = this;
    var specializationArray = [];
    vm.checked = false;
    vm.createValue = false;
    vm.editValue = false;
    vm.assignValue = false;
    vm.deleteValue = false;
    vm.operationClass = "editProductNotActive";
    vm.show = false;

    vm.showProductOperation = function(divClass){
      vm.collegeName = null
      vm.education_stream = null
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

    vm.save = function(collegeName, education_stream){
      var education_stream = getEducationStreamId(education_stream);
      ProductCollegeService.createCollegeDetail(collegeName, education_stream)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.editProduct = function(){
      ProductCollegeService.getEditCollegeData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.editCollegeData = data;
        showEditCollegeData()
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    vm.approve =function(collegeName, education_stream){
      var education_stream = getEducationStreamId(education_stream);
      ProductCollegeService.putCollegeDetail(vm.degreeID, collegeName, education_stream)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.assignSave = function(collegeName){
      var assignCollegeID = collegeName.id
      ProductCollegeService.assignCollegeDetail(vm.degreeID, assignCollegeID)
      .then(function(data, status, headers, config){
        ToastrService.success('Updated Successfully','Success');
        vm.cancel();
        pageRefresh();
      },function(data, status, headers, config){
        ToastrService.error('Update Failed!','Error');
      })
    }

    vm.deleteProduct = function(){
      ProductCollegeService.getDeleteCollegeData(vm.degreeID)
      .then(function(data, status, headers, config){
        vm.deleteCollegeData = data;
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    function pageRefresh(){
      $state.go('product.college', {}, {reload: true});
    }

    function getEducationStreamId(education_stream){
      for(var i=0; i<vm.education_stream_data.length; i++){
        if(vm.education_stream_data[i].name == education_stream){
          education_stream = vm.education_stream_data[i].id
          break;
        }
      }
      return education_stream;
    }

    function showEditCollegeData(){
      vm.collegeName = vm.editCollegeData.name;
      vm.education_stream = vm.editCollegeData.education_stream.name;   
    }

    function modifyData(){
      var specialization = vm.specialization
      for(var i=0; i<specialization.length; i++){
        specializationArray[specialization[i].id] = specialization[i].name;
      }
      for(var i=0; i<vm.details.length; i++){
        vm.details[i].specialization_id = specializationArray[vm.details[i].specialization_id]
      }
    }

    // function getSpecializationData(){
    //   ProductService.getSpecializationList()
    //   .then(function(data, status, headers, config){
    //     vm.specialization = data;
    //     modifyData();
    //   },function(data, status, headers, config){
    //     $log.log("Failed: " + status);
    //   })
    // }

    ProductCollegeService.getEducationStreamData()
    .then(function(data, status, headers, config){
      vm.education_stream_data = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })

    ProductService.getCollegeList(vm)
    .then(function(data, status, headers, config){
      vm.details = data;
    },function(data, status, headers, config){
      $log.log("Failed: " + status);
    })
  }
})();