(function() {
  'use strict';

  angular
    angular.module('AppointmentBookingModule')
    .controller('AppointmentpanelHeaderController', AppointmentpanelHeaderController);

  /** @ngInject */
  function AppointmentpanelHeaderController($state, $stateParams, AppointmentpanelService, $scope, $log ,$q, LoginService, $rootScope, $sessionStorage, $localStorage) {
    var obj = this;
    var notification = 0;
    var fetch_Notification;
    var pendingNotification;
    var completeNotification;
    var reload_time = 10000;
    var notification_watch_counter = 0;
    var localNotificationStorage;
    var localCompleteNotificationStorage;
    var retrievedObject;
    var retrievedCompleteObject;
    obj.showDropDown = false;

    obj.username = $sessionStorage.name; 
    retrievedObject = localStorage.getItem('localNotificationStorage');
    retrievedCompleteObject = localStorage.getItem('localCompleteNotificationStorage');
    
    obj.logout = function(){
      $sessionStorage.pendingNotification = 0;
      $sessionStorage.completeNotification = 0;
      localNotificationStorage = obj.notify[0].updated_at
      var localNotificationStorage = Date.parse(localNotificationStorage)
      localStorage.setItem('localNotificationStorage', JSON.stringify(localNotificationStorage));
      localCompleteNotificationStorage = obj.completeNotify[0].updated_at
      var localCompleteNotificationStorage = Date.parse(localCompleteNotificationStorage)
      localStorage.setItem('localCompleteNotificationStorage', JSON.stringify(localCompleteNotificationStorage));
      clearInterval(fetch_Notification);
      LoginService.logout();
    }

    $scope.state = false;
    
    obj.toggleState = function() {
        $scope.state = !$scope.state;
    };

    obj.navigationBar = function(){
      var bodyEl = $('body'),
      navToggleBtn = bodyEl.find('.nav-toggle-btn');
      bodyEl.toggleClass('active-nav');
    }

    function reloadData(){
      AppointmentpanelPendingService.getAppointmentList(1, 100)
      .then(function(data, status, headers, config){
        obj.notify = data;
        notification_watch_counter = notification_watch_counter + 1;
        recordstoLoad();
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
      AppointmentpanelCompleteService.getAppointmentList(1, 100)
      .then(function(data, status, headers, config){
        obj.completeNotify = data;
        recordstoLoadComplete();
        displayNotification();
      },function(data, status, headers, config){
        $log.log("Failed: " + status);
      })
    }

    function recordstoLoad(){
      if (typeof obj.previous_notify != 'undefined') {
        for(var i=0; i< obj.notify.length; i++){
          var previousAppointmentSubmitDate = obj.previous_notify[0].updated_at
          var previousAppointmentSubmitDate = Date.parse(previousAppointmentSubmitDate)
          var appointmentSubmitDate = obj.notify[i].updated_at
          var appointmentSubmitDate = Date.parse(appointmentSubmitDate)
          if(appointmentSubmitDate > previousAppointmentSubmitDate){
            notification = notification + 1;
            if(typeof pendingNotification == 'undefined'){
              pendingNotification = 1;
              $sessionStorage.pendingNotification = pendingNotification
              obj.pendingNotification = $sessionStorage.pendingNotification
            }
            else{
              pendingNotification = pendingNotification + 1;
              $sessionStorage.pendingNotification = pendingNotification
              obj.pendingNotification = $sessionStorage.pendingNotification
            }
          }
          else {
            obj.previous_notify = obj.notify;
            localNotificationStorage = obj.notify[0].updated_at
            var localNotificationStorage = Date.parse(localNotificationStorage)
            localStorage.setItem('localNotificationStorage', JSON.stringify(localNotificationStorage));
            break;
          }
        }
      }
      else{
        if(typeof obj.notify != 'undefined'){
          for(var i=0; i< obj.notify.length; i++){
            var appointmentSubmitDate = obj.notify[i].updated_at
            var appointmentSubmitDate = Date.parse(appointmentSubmitDate) 
            if(retrievedObject != null){
              retrievedObject = localStorage.getItem('localNotificationStorage');
              localNotificationStorage = JSON.parse(retrievedObject)
            }
            if(typeof localNotificationStorage != 'undefined' && appointmentSubmitDate > localNotificationStorage){
              notification = notification + 1;
              if(typeof pendingNotification == 'undefined'){
                pendingNotification = 1;
                $sessionStorage.pendingNotification = pendingNotification
                obj.pendingNotification = $sessionStorage.pendingNotification
              }
              else{
                pendingNotification = pendingNotification + 1;
                $sessionStorage.pendingNotification = pendingNotification
                obj.pendingNotification = $sessionStorage.pendingNotification
              }
            }
            else{
              obj.previous_notify = obj.notify;
              localNotificationStorage = obj.notify[0].updated_at
              var localNotificationStorage = Date.parse(localNotificationStorage)
              localStorage.setItem('localNotificationStorage', JSON.stringify(localNotificationStorage));
              break;
            }
          }
        }
      }
    }

    function recordstoLoadComplete(){
      if (typeof obj.previous_completeNotify != 'undefined') {
        for(var i=0; i< obj.completeNotify.length; i++){
          var previousAppointmentSubmitDate = obj.previous_completeNotify[0].updated_at
          var previousAppointmentSubmitDate = Date.parse(previousAppointmentSubmitDate)
          var appointmentSubmitDate = obj.completeNotify[i].updated_at
          var appointmentSubmitDate = Date.parse(appointmentSubmitDate)
          if(appointmentSubmitDate > previousAppointmentSubmitDate){
            if(obj.completeNotify[i].status == "unsuccessful" && obj.completeNotify[i].cancelled_by == "customer"){
              notification = notification + 1;
              if(typeof completeNotification == 'undefined'){
                completeNotification = 1;
                $sessionStorage.completeNotification = completeNotification
                obj.completeNotification = $sessionStorage.completeNotification
              }
              else{
                completeNotification = completeNotification + 1;
                $sessionStorage.completeNotification = completeNotification
                obj.completeNotification = $sessionStorage.completeNotification                
              }
            }
          }
          else {
            obj.previous_completeNotify = obj.completeNotify;
            localCompleteNotificationStorage = obj.completeNotify[0].updated_at
            var localCompleteNotificationStorage = Date.parse(localCompleteNotificationStorage)
            localStorage.setItem('localCompleteNotificationStorage', JSON.stringify(localCompleteNotificationStorage));
            break;
          }
        }
      }
      else{
        if(typeof obj.completeNotify != 'undefined'){
          for(var i=0; i< obj.completeNotify.length; i++){
            var appointmentSubmitDate = obj.completeNotify[i].updated_at
            var appointmentSubmitDate = Date.parse(appointmentSubmitDate)
            if(retrievedCompleteObject != null){
              retrievedCompleteObject = localStorage.getItem('localCompleteNotificationStorage');
              localCompleteNotificationStorage = JSON.parse(retrievedCompleteObject)
            }
            if(typeof localCompleteNotificationStorage != 'undefined' && appointmentSubmitDate > localCompleteNotificationStorage){
              if(obj.completeNotify[i].status == "unsuccessful" && obj.completeNotify[i].cancelled_by == "customer"){
                notification = notification + 1;
                if(typeof completeNotification == 'undefined'){
                  completeNotification = 1;                  
                  $sessionStorage.completeNotification = completeNotification
                  obj.completeNotification = $sessionStorage.completeNotification
                }
                else{
                  completeNotification = completeNotification + 1;
                  $sessionStorage.completeNotification = completeNotification
                  obj.completeNotification = $sessionStorage.completeNotification
                }                
              }
            }
            else{
              obj.previous_completeNotify = obj.completeNotify;
              localCompleteNotificationStorage = obj.completeNotify[0].updated_at
              var localCompleteNotificationStorage = Date.parse(localCompleteNotificationStorage)
              localStorage.setItem('localCompleteNotificationStorage', JSON.stringify(localCompleteNotificationStorage));
              break;
            }
          }
        }
      }
    }

    function displayNotification(){
      if(notification > 0){
        obj.notification = notification;
        document.title = '(' + notification + ')'+ 'Pending Appointment'
        obj.previous_notify = obj.notify
      }
      else{ 
        notification = 0;
        obj.notification = notification;
      }
    }

    if(notification_watch_counter == 0){
      reloadData();
    }
    fetch_Notification = setInterval(function(){ reloadData() }, reload_time);

    obj.stop_Notification = function() {
      obj.showDropDown = !obj.showDropDown;
      obj.pendingNotification = $sessionStorage.pendingNotification;
      obj.completeNotification = $sessionStorage.completeNotification;
    }

    obj.cancelAndReload = function(){
      notification = 0;
      obj.notification = null;
      document.title = 'Pending Appointment';
      localNotificationStorage = obj.notify[0].updated_at
      var localNotificationStorage = Date.parse(localNotificationStorage)
      localStorage.setItem('localNotificationStorage', JSON.stringify(localNotificationStorage));
      localCompleteNotificationStorage = obj.completeNotify[0].updated_at
      var localCompleteNotificationStorage = Date.parse(localCompleteNotificationStorage)
      localStorage.setItem('localCompleteNotificationStorage', JSON.stringify(localCompleteNotificationStorage));
    }

    obj.showPendingNotification = function(){
      document.title = 'Pending Appointment'; 
      pendingNotification = 0;
      $sessionStorage.pendingNotification = 0
      clearInterval(fetch_Notification);
      if($state.current.name == "appointmentpanel.pending"){
        $state.go($state.current, {}, {reload: true});
      }
      else{
        $state.go("appointmentpanel.pending", {reload: true});
      }
    }

    obj.showCompleteNotification = function(){
      document.title = 'Completed Appointment'; 
      completeNotification = 0;
      $sessionStorage.completeNotification = 0
      clearInterval(fetch_Notification);
      if($state.current.name == "appointmentpanel.complete"){
        $state.go("appointmentpanel.complete", {reload: true});
      }
      else{
        $state.go("appointmentpanel.complete", {reload: true});
      }
    }

    obj.hideDropDown = function(){
      obj.showDropDown = !obj.showDropDown;
    }
  }
})();