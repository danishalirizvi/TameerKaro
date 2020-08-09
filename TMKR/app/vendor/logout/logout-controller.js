'use strict';

angular.module('app.vendor')
  .controller('VendorLogoutController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$window', '$location',
    function ($scope, $rootScope, $state, AuthenticationService, $window, $location) {
        var parentController = $scope.$parent;
        AuthenticationService.clearCredentialsOnLogout();
        parentController.vendorusername = null;
        $window.reload();      $window.location.href = '/#/vendor';
        //$location.path('/vendor/login');

        ////$location.path('/admin/login');
    }]
  );