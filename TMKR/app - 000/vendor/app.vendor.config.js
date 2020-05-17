(function () {
    'use strict';
    angular
        .module('app.vendor')
        .config(["$stateProvider", "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
            $stateProvider

            .state("vendor.home", {
                url: "/home",
                templateUrl: "app/vendor/home/home.html"
            })
        }]);
})();