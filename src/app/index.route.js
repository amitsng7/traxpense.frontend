(function() {
  'use strict';

  angular
    .module('Trackexpense')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $injector) {
    $urlRouterProvider.otherwise(function($injector, $location) {
      var $state = $injector.get("$state");
      $state.go("login");
    });
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'loginCtrl',
      data: {
        pageTitle: 'Login'
      }
    })
    .state('appointmentpanel',{
      url: '/appointmentpanel',
      views: {
        "@":{
          templateUrl: 'app/appointmentpanel/appointmentpanel.html',
          controller: 'AppointmentpanelController',
          controllerAs: 'appointmentpanelCtrl'
        }
      }
    })
    .state('product',{
      url: '/product',
      views: {
        "@":{
          templateUrl: 'app/product/product.html',
          controller: 'ProductController',
          controllerAs: 'productCtrl'
        },
        "header@product": {
          templateUrl: 'app/product/header/header.html',
          controller: 'ProductHeaderController',
          controllerAs: 'productHeaderCtrl'
        }
      }
    })
     .state('product.speciality',{
      url: '/speciality',
      views: {
        "@product": {
          templateUrl: 'app/product/speciality/product.speciality.html',
          controller: 'ProductSpecialityController',
          controllerAs: 'specialityCtrl'
        },
        "navMenu@product.speciality": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Speciality'
      }
    })
     .state('product.specialization',{
      url: '/specialization',
      views: {
        "@product": {
          templateUrl: 'app/product/specialization/product.specialization.html',
          controller: 'ProductSpecializationController',
          controllerAs: 'specializationCtrl'
        },
        "navMenu@product.specialization": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Specialization'
      }
    })
     .state('product.education',{
      url: '/education',
      views: {
        "@product": {
          templateUrl: 'app/product/education/product.education.html',
          controller: 'ProductEducationController',
          controllerAs: 'educationCtrl'
        },
        "navMenu@product.education": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Education Degree'
      }
    })
     .state('product.college',{
      url: '/college',
      views: {
        "@product": {
          templateUrl: 'app/product/college/product.college.html',
          controller: 'ProductCollegeController',
          controllerAs: 'collegeCtrl'
        },
        "navMenu@product.college": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'College'
      }
    })
     .state('product.surgery',{
      url: '/surgery',
      views: {
        "@product": {
          templateUrl: 'app/product/surgery/product.surgery.html',
          controller: 'ProductSurgeryController',
          controllerAs: 'surgeryCtrl'
        },
        "navMenu@product.surgery": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Surgery'
      }
    })
     .state('product.level',{
      url: '/levels',
      views: {
        "@product": {
          templateUrl: 'app/product/levels/product.level.html',
          controller: 'ProductLevelController',
          controllerAs: 'levelCtrl'
        },
        "navMenu@product.level": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Surgery Levels'
      }
    })
     .state('product.diagnostic',{
      url: '/diagnostic',
      views: {
        "@product": {
          templateUrl: 'app/product/diagnostic/product.diagnostic.html',
          controller: 'ProductDiagnosticController',
          controllerAs: 'diagnosticCtrl'
        },
        "navMenu@product.diagnostic": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Diagnostic'
      }
    })
     .state('product.medical',{
      url: '/medical',
      views: {
        "@product": {
          templateUrl: 'app/product/medical/product.medical.html',
          controller: 'ProductMedicalController',
          controllerAs: 'medicalCtrl'
        },
        "navMenu@product.medical": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Medical'
      }
    })
     .state('product.nonmedical',{
      url: '/nonmedical',
      views: {
        "@product": {
          templateUrl: 'app/product/nonmedical/product.nonmedical.html',
          controller: 'ProductNonMedicalController',
          controllerAs: 'nonmedicalCtrl'
        },
        "navMenu@product.nonmedical": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Non Medical'
      }
    })
     .state('product.room',{
      url: '/room',
      views: {
        "@product": {
          templateUrl: 'app/product/room/product.room.html',
          controller: 'ProductRoomController',
          controllerAs: 'roomCtrl'
        },
        "navMenu@product.room": {
          templateUrl: 'app/product/navmenu/navmenu.html',
          controller: 'ProductNavMenuController',
          controllerAs: 'productNavMenuCtrl'
        }
      },
      data: {
        pageTitle: 'Room Amenities'
      }
    })
    .state('unauthorized', {
      url: '/unauthorized',
      templateUrl: 'app/login/unauthorized.html'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })

    /** @ngInject */
    // $httpProvider.interceptors.push(function ($q, $location, $sessionStorage, $injector, LoginUtils) {
    //   return LoginUtils.loginInterceptor
    // });
  }
})();