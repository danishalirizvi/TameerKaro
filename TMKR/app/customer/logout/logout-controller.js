﻿'use strict';

angular.module('app.customer')
  .controller('LogoutController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$window',
    function ($scope, $rootScope, $state, AuthenticationService, $window) {
        var parentController = $scope.$parent;

        AuthenticationService.clearCredentials('cookiecustomer');

        parentController.isUserLoggedIn = false;
        parentController.customerusername = '';
        $window.localStorage.clear();
        $state.go("customer.home");
    }]
  );