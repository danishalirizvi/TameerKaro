
(function () {
    'use strict';
    angular
        .module('app').config(["$stateProvider", "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/customer");
                $stateProvider.state("customer", {
                    url: "/customer",
                    templateUrl: "app/customer/customer.html",
                    redirectTo: "customer.home"
                })
                .state("vendor", {
                    url: "/vendor",
                    templateUrl: "app/vendor/vendor.html",
                    redirectTo: "vendor.home"
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
