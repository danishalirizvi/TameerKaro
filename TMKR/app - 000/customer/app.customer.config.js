(function () {
    'use strict';
    angular
        .module('app.customer')
        .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state("customer.home", {
                    url: "/home",
                    templateUrl: "app/customer/home/home.html"
                })

                .state("customer.login", {
                    url: "/login",
                    templateUrl: "app/customer/login/login.html",
                    controller: "LoginController"
                })

                .state("customer.register", {
                    url: "/register",
                    templateUrl: "app/customer/register/register.html",
                    controller: "RegisterController as vm"
                })

                .state("customer.logout", {
                    url: "/logout",
                    templateUrl: "app/customer/logout/logout.html",
                    controller: "LogoutController"
                })

                .state("customer.shopping", {
                    url: "/shopping",
                    templateUrl: "app/customer/cart/cart.html",
                    controller: "CartController",
                    resolve: {
                        authentication: authentication
                    }
                })

                .state("customer.cart", {
                    url: "/cart",
                    templateUrl: "app/customer/cartdetail/cartdetail.html",
                    controller: "CartDetailController"
                })

                .state("customer.profiledetails", {
                    url: "/profiledetails",
                    templateUrl: "app/customer/profiledetail/profiledetails.html",
                    controller: "ProfileDetailController"
                })

                .state("customer.profile", {
                    url: "/profile",
                    templateUrl: "app/customer/profile/profile.html",
                    controller: "ProfileController"
                })

                .state("customer.materialEstimate", {
                    url: "/estimates",
                    templateUrl: "app/customer/material-estimate/material-estimate.html"
                })

                .state("customer.costEstimate", {
                    url: "/costs",
                    templateUrl: "app/customer/cost-estimate/cost-estimate.html"
                })

                .state("customer.placeOrder", {
                    url: "/order",
                    templateUrl: "app/place-order/place-order.html",
                    controller: "PlaceOrderController"
                })

                 .state("customer.checkout", {
                     url: "/checkout",
                     templateUrl: "app/cart/summary.html",
                     controller: "CheckOutController"
                 });
        }]);

        authentication.$inject = ['$q', '$location', 'AuthenticationService','$state'];

        function authentication($q, $location, AuthenticationService, ) {
            if (!AuthenticationService.isAuthenticated()) {
                var returnUrl = $location.path();
                $state.go('customer.login');
            }
        }
})();

