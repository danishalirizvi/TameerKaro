(function () {
    'use strict';
    angular
        .module('app.admin')
        .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("admin.login", {
                    url: "/login",
                    templateUrl: "app/admin/login/login.html",
                    controller: "AdminLoginController",
                    portal: "admin",
                    resolve: {
                        cookie: cookie,
                        portalcheck: portalcheck
                    }
                })
                .state("admin.home", {
                    url: "/home",
                    templateUrl: "app/admin/home/home.html",
                    portal: "admin",
                    resolve: {
                        cookie: cookie
                    }
                })
                .state("admin.logout", {
                    url: "/logout",
                    controller: "AdminLogoutController",
                    portal: "admin"
                })
                .state("admin.customers", {
                    url: "/customers",
                    templateUrl: "app/admin/customers/customers.html",
                    controller: "CustomersController",
                    portal: "admin",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })
                .state("admin.vendors", {
                    url: "/vendors",
                    templateUrl: "app/admin/vendors/vendors.html",
                    controller: "VendorsController",
                    portal: "admin",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })
                .state("admin.advertiesments", {
                    url: "/advertiesments",
                    templateUrl: "app/admin/advts/advts.html",
                    controller: "AdvertisementsController",
                    portal: "admin",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })
                .state("admin.orders", {
                    url: "/orders",
                    templateUrl: "app/admin/orders/orders.html",
                    controller: "OrdersController",
                    portal: "admin",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })
                
        }]);

    angular
        .module('app.admin')
        .run(['$rootScope', '$state', 'AuthenticationService',
            function ($rootScope, $state, AuthenticationService) {
                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams, error) {
                        var adminusername = AuthenticationService.getUsername('cookieadmin');
                        if ((typeof toState.portal != 'undefined')
                            && ((typeof fromState === 'undefined') || (fromState.portal === 'admin'))
                            && (toState.portal === "vendor" || toState.portal === 'customer')
                            && (adminusername!=null)) {
                            event.preventDefault();
                            $state.go('admin.home');
                        }
                         
                    });
            }]);

    authentication.$inject = ['$rootScope', '$state', '$location', 'AuthenticationService'];

    function authentication($rootScope, $state, $location, AuthenticationService) {
        //if (!navigator.cookieEnabled) {
        //    $location.url('customer/error');
        //}
        //else
        if (!AuthenticationService.isAuthenticated('cookieadmin')) {
            //var returnUrl = $location.path();
            $location.url('admin/login');
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

