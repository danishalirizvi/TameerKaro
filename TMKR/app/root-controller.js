(function () {
    'use strict';
    angular.module('app')
      .controller('RootController', ['$scope', 'AuthenticationService', '$state', '$modal',
    function ($scope, AuthenticationService, $state, $modal) {

        $scope.customerusername = null;
        $scope.vendorusername = null;

        var cookieName = AuthenticationService.checkUserType();
        if (cookieName === 'cookiecustomer') {
            $scope.customerusername = AuthenticationService.getUsername(cookieName);
        }
        else if (cookieName === 'cookievendor') {
            $scope.vendorusername = AuthenticationService.getUsername(cookieName);
        } else {
            $scope.customerusername = null;
            $scope.vendorusername = null;
        }

        var customerNameFromCookie = function () {
            var activeUser = AuthenticationService.checkUserType();
            if (activeUser === 'cookiecustomer') {
                return AuthenticationService.getUsername(activeUser);
            }
            else if (activeUser === 'cookievendor') {
                return AuthenticationService.getUsername(activeUser);
            }
        }

        $scope.validateNav = function (userType, state, perm) {
            var userName = customerNameFromCookie();
            if (typeof userName === 'undefined') {
                if (!perm) {
                    $scope.showErrorLoginAlert();
                } else {
                    $state.go(state);
                }
            } else {
                $state.go(state);
            }
        }

        $scope.showErrorLoginAlert = function () {
            $modal.open({
                templateUrl: 'app/popup/error-alert.html',
                controller: function ($scope, $modalInstance) {
                    $scope.submit = function () {
                        $log.log('Submiting user info.');
                        $log.log($scope.selected);
                        $modalInstance.dismiss('cancel');
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    //user: function () {
                    //    return $scope.selected;
                    //}
                }
            });
        }


    }]);
})();