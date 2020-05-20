(function () {
    'use strict';
    angular
        .module('app.vendor')
        .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            //$urlRouterProvider.otherwise("/home");
            $stateProvider

            .state("vendor.home", {
                url: "/home",
                templateUrl: "app/vendor/home/home.html",
                portal: "vendor"
            })
            .state("vendor.register", {
                url: "/register",
                templateUrl: "app/vendor/register/register.html",
                controller: "VendorRegisterController as vm",
                portal: "vendor"
            })
            .state("vendor.login", {
                url: "/login",
                templateUrl: "app/vendor/login/login.html",
                controller: "VendorLoginController",
                portal: "vendor"
            })
            .state("vendor.logout", {
                url: "/logout",
                controller: "VendorLogoutController",
                portal: "vendor"
            })
            .state("vendor.createAdd", {
                url: "/createAdd",
                templateUrl: "app/vendor/advertisements/create-advt.html",
                controller: "CreateAdvertisementController",
                portal: "vendor"
            })
            .state("vendor.purchaseOrder", {
                url: "/purchaseOrder",
                templateUrl: "app/vendor/purchaseorders/purchase-order.html",
                controller: "PurchaseOrderController",
                portal: "vendor"
            })
            .state("vendor.activeadvts", {
                url: "/activeadvertisements",
                templateUrl: "app/vendor/activeAdvts/advts.html",
                controller: "ActiveAdvtsContoller",
                portal: "vendor"
            })
            .state("vendor.profile", {
                url: "/profile",
                templateUrl: "app/vendor/profile/profile.html",
                controller: "VendorProfileController",
                portal: "vendor"
            })
            .state("vendor.profiledetails", {
                url: "/profiledetails",
                templateUrl: "app/vendor/profiledetail/profiledetails.html",
                controller: "VendorProfileDetailController",
                portal: "vendor"
            })
            .state("vendor.editadvts", {
                url: "/editadvertisement?advtId",
                templateUrl: "app/vendor/editadvt/editadvt.html",
                controller: "EdirtAdvtController",
                portal: "vendor"
            });

        }]);

    angular
        .module('app.vendor')
        .run(['$rootScope', '$state', 'AuthenticationService',
            function ($rootScope, $state, AuthenticationService) {
                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams, error) {

                        var vendorusername = AuthenticationService.getUsername('cookievendor');
                        if ((typeof toState.portal != 'undefined') &&
                        (typeof fromState.portal != 'undefined') &&
                        (fromState.portal === "vendor" && toState.portal === "customer")
                            && (vendorusername != null)) {
                            event.preventDefault();
                            $state.go('vendor.home');
                        }
                    });
            }]);
})();