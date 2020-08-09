'use strict';

angular.module('app.customer')
  .controller('LogoutController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$window', '$location',
    function ($scope, $rootScope, $state, AuthenticationService, $window, $location) {
        //$scope.showLoading = false;

        //$scope.CustomerLoggingOut = function () {
        //    $scope.showLoading = true;
        //    var parentController = $scope.$parent;
        //    AuthenticationService.clearCredentialsOnLogout();
        //    parentController.customerusernamess = null;
        //    $window.location.href = '/';
        //    $scope.showLoading = false;
        //};
        
    }]
  );