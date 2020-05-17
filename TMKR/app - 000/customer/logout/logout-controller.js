'use strict';

angular.module('app.customer')
  .controller('LogoutController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$window',
    function ($scope, $rootScope, $state, AuthenticationService, $window) {
        var parentController = $scope.$parent;

        AuthenticationService.clearCredentials();

        parentController.isUserLoggedIn = false;
        parentController.username = '';
        $window.localStorage.clear();
        $state.go("home");
    }]
  );