
(function () {
    'use strict';
    angular
        .module('app').config(["$stateProvider", "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/customer");
                $stateProvider
                    .state("admin", {
                        url: "/admin",
                        templateUrl: "app/admin/admin.html",
                        redirectTo: "admin.login"
                    })
                    .state("customer", {
                        url: "/customer",
                        templateUrl: "app/customer/customer.html",
                        redirectTo: "customer.home"
                    })
                    .state("vendor", {
                        url: "/vendor",
                        templateUrl: "app/vendor/vendor.html",
                        redirectTo: "vendor.home"
                    })
                    .state("error", {
                        url: "/error",
                        templateUrl: "app/cookieError.html"
                    })
            }])
    .run(['$rootScope', '$state',
         function ($rootScope, $state) {
             $rootScope.$on('$stateChangeStart', function (evt, to, params) {
                 if (to.redirectTo) {
                     evt.preventDefault();
                     $state.go(to.redirectTo, params)
                 }
             });
         }]);
})();
