(function () {
    'use strict';
    angular.module('app')
      .controller('RootController', ['$scope', 'AuthenticationService', '$state',
    function ($scope, AuthenticationService, $state) {

        $scope.customerusername = null;
        $scope.vendorusername = null;

        var cookieName = AuthenticationService.checkUserType();
        if (cookieName === 'cookiecustomer') {
            $scope.customerusername = AuthenticationService.getUsername(cookieName);
        }
        else if (cookieName === 'cookievendor') {
            $scope.vendorusername = AuthenticationService.getUsername(cookieName);
        }

        $scope.validateNav = function (userType, state, perm) {

            if ($scope.customerusername == null && $scope.vendorusername == null) {
                if (!perm) {
                    alert('Login to Proceed A');
                } else {
                    $state.go(state);
                }
            } else {
                $state.go(state);
            }
        }
    }]);
})();