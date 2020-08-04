'use strict';

angular.module('app.admin')
  .controller('AdminLogoutController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$window', '$location',
function ($scope, $rootScope, $state, AuthenticationService, $window, $location) {
        var parentController = $scope.$parent;

        AuthenticationService.clearCredentials('cookieadmin');

        parentController.adminusername = null;
        $window.localStorage.clear();
        //$state.go("admin.login");
        $location.path('/admin/login');
    }]
  );