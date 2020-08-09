(function () {
    'use strict';
    angular
        .module('app.vendor')
        .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider

            .state("vendor.home", {
                url: "/home",
                templateUrl: "app/vendor/home/home.html",
                portal: "vendor",
                resolve: {
                    cookie: cookie
                }
            })
            .state("vendor.register", {
                url: "/register",
                templateUrl: "app/vendor/register/register.html",
                controller: "VendorRegisterController as vm",
                portal: "vendor",
                resolve: {
                    cookie: cookie
                }
            })
            .state("vendor.login", {
                url: "/login",
                templateUrl: "app/vendor/login/login.html",
                controller: "VendorLoginController",
                portal: "vendor",
                resolve: {
                    cookie: cookie
                }
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
                portal: "vendor",
                resolve: {
                    authentication: authentication,
                    cookie: cookie
                }
            })
            .state("vendor.purchaseOrder", {
                url: "/purchaseOrder",
                templateUrl: "app/vendor/purchaseorders/purchase-order.html",
                controller: "PurchaseOrderController",
                portal: "vendor",
                resolve: {
                    authentication: authentication,
                    cookie: cookie
                }
            })
            .state("vendor.activeadvts", {
                url: "/activeadvertisements",
                templateUrl: "app/vendor/activeAdvts/advts.html",
                controller: "ActiveAdvtsContoller",
                portal: "vendor",
                resolve: {
                    authentication: authentication,
                    cookie: cookie
                }
            })
            .state("vendor.profile", {
                url: "/profile",
                templateUrl: "app/vendor/profile/profile.html",
                controller: "VendorProfileController",
                portal: "vendor",
                resolve: {
                    authentication: authentication,
                    cookie: cookie
                }
            })
            .state("vendor.profiledetails", {
                url: "/profiledetails",
                templateUrl: "app/vendor/profiledetail/profiledetails.html",
                controller: "VendorProfileDetailController",
                portal: "vendor",
                resolve: {
                    authentication: authentication,
                    cookie: cookie
                }
            })
            .state("vendor.editadvts", {
                url: "/editadvertisement?advtId",
                templateUrl: "app/vendor/editadvt/editadvt.html",
                controller: "EdirtAdvtController",
                portal: "vendor",
                resolve: {
                    authentication: authentication,
                    cookie: cookie
                }
            });

        }]);

    angular
        .module('app.vendor')
        .run(['$rootScope', '$state', 'AuthenticationService',
            function ($rootScope, $state, AuthenticationService) {
                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams, error) {              
                        var vendorusername = AuthenticationService.getUsername('cookievendor');
                        if ((typeof toState.portal != 'undefined')
                            && ((typeof fromState === 'undefined') || (fromState.portal === 'vendor'))
                            && (toState.portal === "customer" || toState.portal === "admin")
                            && (vendorusername!=null)) {
                            event.preventDefault();
                            $state.go('vendor.home');
                        }
                    });
            }]);

    authentication.$inject = ['$rootScope', '$state', '$location', 'AuthenticationService'];

    function authentication($rootScope, $state, $location, AuthenticationService) {
        //if (!navigator.cookieEnabled) {
        //    $location.url('customer/error');
        //}
        //else
        if (!AuthenticationService.isAuthenticated('cookievendor')) {
            //var returnUrl = $location.path();
            $location.url('vendor/login');
            //$state.go('customer.login');
        }
    }


    cookie.$inject = ['$location'];

    function cookie($location) {
        var cookies = ("cookie" in document && (document.cookie.length > 0 ||
        (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));

        if (!cookies) {
            $location.url('/error');
        }
        //if (!navigator.cookieEnabled) {
        //    $location.url('customer/error');
        //}
    }

    portalcheck.$inject = ['$scope'];

    function portalcheck($scope) {
        //var parentController = $scope.$parent;
        if ($scope.customerusername == null && $scope.vendorusername == null) {
            alert('Admin');
        } else if ($scope.vendorusername == null && $scope.adminusername == null) {
            alert('Customer');
        } else if ($scope.adminusername == null && $scope.customerusername == null) {
            alert('Vendor');
        }
    }

})();