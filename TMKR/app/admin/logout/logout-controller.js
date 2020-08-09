'use strict';

angular.module('app.admin')
  .controller('AdminLogoutController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$window', '$location',
function ($scope, $rootScope, $state, AuthenticationService, $window, $location) {
        var parentController = $scope.$parent;
        AuthenticationService.clearCredentialsOnLogout();
        parentController.adminusername = null;
        $window.location.href = '#/admin';//
        //$location.path('/admin/login');

        ///AuthenticationService.clearCredentials('cookieadmin');   
        //$window.localStorage.clear();
        //parentController.adminusername = null;
        ////$state.go("admin.login");
        //$window.location.href = '/admin/login';
        ////$location.path('/admin/login');
    }]
  );