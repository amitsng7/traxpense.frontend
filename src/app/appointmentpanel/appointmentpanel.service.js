(function(){
  'use strict';
  angular
    .module('AppointmentBookingModule')
    .factory('AppointmentpanelService', AppointmentpanelService);   

  function AppointmentpanelService($http, $q, $log, $rootScope){

//     var checkbeforeSubmit = function(date){
//       if(typeof date == 'undefined'){
//         var message = "Can't submit, Kindly select date and time properly";
//         return message;
//       }
//       if(typeof date != 'undefined'){
//         var current_date = Date.parse(new Date());
//         var appointment_date = Date.parse(date)
//         if(appointment_date <= current_date){
//           var message = "Please select future date";
//           return message;
//         }
//       }
//     }

//     var checkreasonSubmit = function(reason){
//       if(typeof reason == 'undefined'){
//         var message = "Can't submit, reason is required";
//         return message;
//       }
//     }

//     var buildAppointmentTime = function(date){
//       time.setDate(date.getDate());
//       time.setMonth(date.getMonth());
//       time.setYear(date.getFullYear());
//       return time;
//     }

//     var formatAppointmentTime = function(time){
//       if (time>=1200) { 
//         var timetohrs = time/100;
//         var timetohrs = Math.floor(timetohrs);
//         var timetomin = time%100;
//         if (timetomin == 0) {
//           timetomin = ("" + timetomin + timetomin);
//         }
//         if (timetomin.toString().length == 1) {
//           timetomin = ("" + timetomin + 0);
//         }
//         var timetohrs = (timetohrs - 12);
//         var time = ("" + timetohrs + ':' + timetomin + 'PM');
//       }
//       if(time<=1200){
//         var timetohrs = time/100;
//         var timetohrs = Math.floor(timetohrs);
//         var timetomin = time%100;
//         if (timetomin == 0) {
//           timetomin = ("" + timetomin + timetomin);
//         }
//         if (timetomin.toString().length == 1) {
//           timetomin = ("" + timetomin + 0);
//         }
//         var time = ("" + timetohrs + ':' + timetomin + 'AM');
//       }     
//       if(time.endsWith('M') == true) {
//         var time = time;
//       }
//     return time;
//   }

//   var formatDate = function(date){
//     var dateArray = new Date(date).toDateString().split(' ');
//     date = [dateArray[2],dateArray[1],dateArray[3]].join('-');
//     return date;
//   }
    
//   var buildDateTimeString = function(date){
//     var dateObj = new Date(date);
//     var dateArray = dateObj.toDateString().split(' ');
//     var timeArray = dateObj.toLocaleTimeString();
//     date = [dateArray[2],dateArray[1],dateArray[3]].join('-');
//     date = date + " at " + timeArray;
//     return date;
//   }

//   return {
//     checkbeforeSubmit: checkbeforeSubmit,
//     checkreasonSubmit: checkreasonSubmit,
//     buildAppointmentTime: buildAppointmentTime,
//     formatAppointmentTime: formatAppointmentTime,
//     formatDate: formatDate,
//     buildDateTimeString: buildDateTimeString
//   }  
}

})();