(function () {
    'use strict';
    angular.module('app')
      .controller('RootController', ['$scope', 'AuthenticationService',
        function ($scope, AuthenticationService) {
            var cookieName = AuthenticationService.checkUserType();
            if (cookieName === 'cookiecustomer') {
                $scope.customerusername = AuthenticationService.getUsername(cookieName);
            }
            else if (cookieName === 'cookievendor') {
                $scope.vendorusername = AuthenticationService.getUsername(cookieName);
            }
        }]);
})();