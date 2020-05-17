'use strict';

angular.module('app.vendor')
  .controller('VendorLogoutController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$window',
    function ($scope, $rootScope, $state, AuthenticationService, $window) {
        var parentController = $scope.$parent;
   
        AuthenticationService.clearCredentials('cookievendor');

        parentController.isUserLoggedIn = false;
        parentController.vendorusername = '';
        $window.localStorage.clear();
        $state.go("vendor.home");
    }]
  );