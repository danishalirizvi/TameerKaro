﻿(function () {
    'use strict';
    angular
        .module('app.customer')
        .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("customer.home", {
                    url: "/home",
                    templateUrl: "app/customer/home/home.html",
                    portal: "customer",
                    resolve: {
                        cookie: cookie
                    }
                })

                .state("customer.login", {
                    url: "/login",
                    templateUrl: "app/customer/login/login.html",
                    controller: "LoginController",
                    portal: "customer",
                    resolve: {
                        cookie: cookie
                    }
                })

                .state("customer.register", {
                    url: "/register",
                    templateUrl: "app/customer/register/register.html",
                    controller: "RegisterController as vm",
                    portal: "customer",
                    resolve: {
                        cookie: cookie
                    }
                })

                .state("customer.logout", {
                    url: "/logout",
                    controller: "LogoutController",
                    portal: "customer"
                })

                .state("customer.shopping", {
                    url: "/shopping",
                    templateUrl: "app/customer/cart/cart.html",
                    controller: "CartController",
                    portal: "customer",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })

                .state("customer.cart", {
                    url: "/cart",
                    templateUrl: "app/customer/cartdetail/cartdetail.html",
                    controller: "CartDetailController",
                    portal: "customer",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })

                .state("customer.profiledetails", {
                    url: "/profiledetails",
                    templateUrl: "app/customer/profiledetail/profiledetails.html",
                    controller: "ProfileDetailController",
                    portal: "customer",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })

                .state("customer.profile", {
                    url: "/profile",
                    templateUrl: "app/customer/profile/profile.html",
                    controller: "ProfileController",
                    portal: "customer",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })

                .state("customer.materialEstimate", {
                    url: "/estimates",
                    templateUrl: "app/customer/material-estimate/material-estimate.html",
                    controller: "MaterialEstimate",
                    portal: "customer",
                    resolve: {
                        cookie: cookie
                    }
                })

                .state("customer.costEstimate", {
                    url: "/costs",
                    templateUrl: "app/customer/cost-estimate/cost-estimate.html",
                    portal: "customer",
                    resolve: {
                        cookie: cookie
                    }
                })

                //.state("customer.placeOrder", {
                //    url: "/order",
                //    templateUrl: "app/place-order/place-order.html",
                //    controller: "PlaceOrderController",
                //    portal: "customer"
                //})

                //.state("customer.checkout", {
                //    url: "/checkout",
                //    templateUrl: "app/cart/summary.html",
                //    controller: "CheckOutController",
                //    portal: "customer"
                //})
                //.state("customer.uploader", {
                //    url: "/uploader",
                //    templateUrl: "app/customer/uploader/home/home.html",
                //    controller: "HomeCtrl",
                //    portal: "customer"
                //})
                .state("customer.orders", {
                    url: "/orders",
                    templateUrl: "app/customer/orders/orders.html",
                    controller: "OrderController",
                    portal: "customer",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                })
                .state("customer.product", {
                    url: "/product?advtId",
                    templateUrl: "app/customer/product/product.html",
                    controller: "ProductController",
                    portal: "customer",
                    resolve: {
                        authentication: authentication,
                        cookie: cookie
                    }
                });
        }]);

    angular
        .module('app.customer')
        .run(['$rootScope', '$state', 'AuthenticationService',
            function ($rootScope, $state, AuthenticationService) {
                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams, error) {
                        var customerusername = AuthenticationService.getUsername('cookiecustomer');
                        if ((typeof toState.portal != 'undefined')
                            && ((typeof fromState === 'undefined') || (fromState.portal === 'customer'))
                            && (toState.portal === "vendor" || toState.portal === "admin")
                            && (customerusername != null)) {
                            event.preventDefault();
                            $state.go('customer.home');
                        }
                    });
            }]);

    authentication.$inject = ['$location', 'AuthenticationService'];

    function authentication($location, AuthenticationService) {
        //if (!navigator.cookieEnabled) {
        //    $location.url('customer/error');
        //}
        //else
        if (!AuthenticationService.isAuthenticated('cookiecustomer')) {
            //var returnUrl = $location.path();
            $location.url('customer/login');
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

