(function() {
  'use strict';

  angular
    .module('AppointmentBookingModule')
    .controller('AppointmentpanelController', AppointmentpanelController);

  /** @ngInject */
  function AppointmentpanelController($state, $stateParams, AppointmentpanelService, $scope, $log ,$q, LoginService, $rootScope, $sessionStorage) {
    $state.go('appointmentpanel.pending');
  }
})();