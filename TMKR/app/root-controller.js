(function () {
    'use strict';
    angular.module('app')
      .controller('RootController', ['$scope', '$location', 'AuthenticationService', '$state', '$modal', '$cookies', '$window', '$timeout',
    function ($scope, $location, AuthenticationService, $state, $modal, $cookies, $window, $timeout) {

        $scope.customerusername = null;
        $scope.vendorusername = null;
        $scope.adminusername = null;

        $scope.showLoading = false;

        $scope.onInit = function () {
            $scope.showLoading = true;
            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        }
        
        $scope.CustomerLoggingOut = function () {
            $scope.showLoading = true;             
            AuthenticationService.clearCredentialsOnLogout();
            $scope.customerusername = null;            
            $state.go('customer.login', {}, { reload: true });

            $timeout(function () {
                $scope.showLoading = false;                
            }, 1000);
        };

        $scope.VendorLoggingOut = function () {
            $scope.showLoading = true;            
            AuthenticationService.clearCredentialsOnLogout();
            $scope.vendorusername = null;
            $state.go('vendor.login', {}, { reload: true });

            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        };


        $scope.AdminLoggingOut = function () {
            $scope.showLoading = true;
            AuthenticationService.clearCredentialsOnLogout();
            $scope.adminusername = null;
            $state.go('admin.login', {}, { reload: true });

            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        };

        
        var cookieName = AuthenticationService.checkUserType();
        if (cookieName === 'cookiecustomer') {
            $scope.customerusername = AuthenticationService.getUsername(cookieName);
            if (($location.path().indexOf('/vendor') > -1) || ($location.path() === "") || ($location.path().indexOf('/admin') > -1)) {
                $location.url('customer/home');
                ///$state.go('customer.home');
                //alert('different location - customer cookie');
            }
        }
        else if (cookieName === 'cookievendor') {
            $scope.vendorusername = AuthenticationService.getUsername(cookieName);
            if (($location.path().indexOf('/customer') > -1) || ($location.path() === "") || ($location.path().indexOf('/admin') > -1)) {
                $location.url('vendor/home');
                ///$state.go('vendor.home');
                //alert('different location - vendor cookie');
            }
        }
        else if (cookieName === 'cookieadmin') {
            $scope.adminusername = AuthenticationService.getUsername(cookieName);
            if (($location.path().indexOf('/customer') > -1) || ($location.path() === "") || ($location.path().indexOf('/vendor') > -1)) {
                $location.url('admin/home');
                //$state.go('admin.home');
                //alert('different location - admin cookie');
            }
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