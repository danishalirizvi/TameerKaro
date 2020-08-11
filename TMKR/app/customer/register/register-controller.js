(function () {
    'use strict';

    angular
        .module('app.customer')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$http', '$state', '$window', '$modal'];

    function RegisterController($scope, $http, $state, $window, $modal) {
        $scope.credentials = {};
        $scope.signupForm = {};
        $scope.error = false;
        $scope.submitted = false;
        var parentController = $scope.$parent;

        var validateUsername = function () {
            $http({
                method: 'GET',
                url: '/api/customer/validateUsername',
                params: { username: $scope.credentials.USR_NME }
            })
            .success(function (response) {
                if (response) {
                    $scope.showErrorAlertUsername();
                } else {
                    validatePasswordMatching();
                }
            })
            .error(function (response) {
                alert('Server not Responding. Try Again Later');
            });
        }

        var validatePasswordMatching = function () {
            if ($scope.credentials.PSWD != $scope.credentials.confirmpassword) {
                $scope.showErrorAlert();
            } else {
                register($scope.credentials);
            }
        }

        var register = function (credentials) {
            $http.post('/api/customer/Register', JSON.stringify(credentials))
            .success(function (response) {
                $scope.submitted = false;
                $scope.showSuccessAlert();
                $state.go('customer.login');
            })
            .error(function (response) {
                $scope.submitted = false;
                $state.go('customer.home');
            });
        }
        
        $scope.submit = function () {
            $scope.submitted = true;
            if (!$scope.signupForm.$invalid) {
                validateUsername();
            } else {
                $scope.error = true;
            }
        }

        $scope.showErrorAlert = function () {
            $modal.open({
                templateUrl: 'app/customer/register/error-alert.html',
                controller: function ($scope, $modalInstance) { 
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });
        }


        $scope.showErrorAlertUsername = function () {
            $modal.open({
                templateUrl: 'app/customer/register/error-alert-username.html',
                controller: function ($scope, $modalInstance) {
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });
        }

        $scope.showSuccessAlert = function () {
            $modal.open({
                templateUrl: 'app/customer/register/success-alert.html',
                controller: function ($scope, $modalInstance) {
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });
        }

    }
})();

