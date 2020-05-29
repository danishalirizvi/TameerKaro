(function () {
    'use strict';
    angular
        .module('app.customer')
        .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("customer.home", {
                    url: "/home",
                    templateUrl: "app/customer/home/home.html",
                    portal: "customer"
                })

                .state("customer.login", {
                    url: "/login",
                    templateUrl: "app/customer/login/login.html",
                    controller: "LoginController",
                    portal: "customer"
                })

                .state("customer.register", {
                    url: "/register",
                    templateUrl: "app/customer/register/register.html",
                    controller: "RegisterController as vm",
                    portal: "customer"
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
                        authentication: authentication
                    }
                })

                .state("customer.cart", {
                    url: "/cart",
                    templateUrl: "app/customer/cartdetail/cartdetail.html",
                    controller: "CartDetailController",
                    portal: "customer"
                })

                .state("customer.profiledetails", {
                    url: "/profiledetails",
                    templateUrl: "app/customer/profiledetail/profiledetails.html",
                    controller: "ProfileDetailController",
                    portal: "customer"
                })

                .state("customer.profile", {
                    url: "/profile",
                    templateUrl: "app/customer/profile/profile.html",
                    controller: "ProfileController",
                    portal: "customer"
                })

                .state("customer.materialEstimate", {
                    url: "/estimates",
                    templateUrl: "app/customer/material-estimate/material-estimate.html",
                    portal: "customer"
                })

                .state("customer.costEstimate", {
                    url: "/costs",
                    templateUrl: "app/customer/cost-estimate/cost-estimate.html",
                    portal: "customer"
                })

                .state("customer.placeOrder", {
                    url: "/order",
                    templateUrl: "app/place-order/place-order.html",
                    controller: "PlaceOrderController",
                    portal: "customer"
                })

                .state("customer.checkout", {
                    url: "/checkout",
                    templateUrl: "app/cart/summary.html",
                    controller: "CheckOutController",
                    portal: "customer"
                })
                .state("customer.image", {
                    url: "/image",
                    templateUrl: "app/customer/image/index.html",
                    controller: "FileUploadController",
                    portal: "customer"
                })
                .state("customer.uploader", {
                    url: "/uploader",
                    templateUrl: "app/customer/uploader/home/home.html",
                    controller: "HomeCtrl",
                    portal: "customer"
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
                            && (typeof fromState.portal != 'undefined')
                            && (fromState.portal === "customer" && toState.portal === "vendor")
                            && (customerusername != null)) {
                            event.preventDefault();
                            $state.go('customer.home');
                        }
                    });
            }]);

    authentication.$inject = ['$q', '$location', 'AuthenticationService', '$state'];

    function authentication($q, $location, AuthenticationService) {
        if (!AuthenticationService.isAuthenticated('cookiecustomer')) {
            var returnUrl = $location.path();
            $state.go('customer.login');
        }
    }
})();

