(function () {
    'use strict';
    angular.module('app')
      .controller('RootController', ['$scope', '$location', 'AuthenticationService', '$state', '$modal', '$cookies', '$window',
    function ($scope, $location, AuthenticationService, $state, $modal, $cookies, $window) {

        $scope.customerusername = null;
        $scope.vendorusername = null;
        $scope.adminusername = null;

        var cookieName = AuthenticationService.checkUserType();
        if (cookieName === 'cookiecustomer') {
            $scope.customerusername = AuthenticationService.getUsername(cookieName);            
        }
        else if (cookieName === 'cookievendor') {
            $scope.vendorusername = AuthenticationService.getUsername(cookieName);
        }
        else if (cookieName === 'cookieadmin') {
            $scope.adminusername = AuthenticationService.getUsername(cookieName);
        }
        else {
            $scope.adminusername = null;
            $scope.customerusername = null;
            $scope.vendorusername = null;
        }

        var userNameFromCookie = function () {
            var activeUser = AuthenticationService.checkUserType();
            if (activeUser === 'cookiecustomer') {
                return AuthenticationService.getUsername(activeUser);
            }
            else if (activeUser === 'cookievendor') {
                return AuthenticationService.getUsername(activeUser);
            }
            else if (activeUser === 'cookieadmin') {
                return AuthenticationService.getUsername(activeUser);
            }
        }

        $scope.validateNav = function (userType, state, perm) {

            if (!navigator.cookieEnabled) {
                $location.url('/error');
            } else {
                var userName = userNameFromCookie();
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
        }


        //var are_cookies_enabled = function () {
        //    $cookies.putObject('test', 'abc');
        //    var cookie = $cookies.getObject('test');

        //    return cookie === undefined ? false : true;
        //}

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