(function () {
    'use strict';

    angular
        .module('app.vendor')
        .controller('VendorProfileController', VendorProfileController);

    VendorProfileController.$inject = ['$scope', '$http', '$state', 'AuthenticationService', '$modal'];

    function VendorProfileController($scope, $http, $state, AuthenticationService, $modal) {
        $scope.credentials = {};
        $scope.profileForm = {};
        $scope.error = false;
        $scope.submitted = false;

        $scope.credentials = AuthenticationService.getUserObject('cookievendor');
         
        $scope.credentials.PHNE = parseInt($scope.credentials.PHNE);

        $scope.credentials.PSWD = null;
        $scope.credentials.confirmpassword = null;
        $scope.credentials.CRNT_PSWD = null;

        //when the form is submitted
        $scope.submit = function () {
            $scope.submitted = true;
            if (!$scope.profileForm.$invalid && $scope.credentials.PSWD === $scope.credentials.confirmpassword) {
                $http.post('/api/vendor/updatevendorprofile', JSON.stringify($scope.credentials))
                .success(function (response) {
                    AuthenticationService.setCredentials(response.USR_NME, response.PSWD, response, 'cookievendor');
                    $scope.showSuccessAlert();
                    $scope.submitted = false;
                    $state.go('vendor.profiledetails');
                })
                .error(function (response) {
                    $scope.submitted = false;
                    alert('Server not Responding. Try Again Later');
                });
            } else {
                $scope.submitted = false;
                $scope.error = true;
                $scope.showErrorLoginAlert();
                return;
            }
        };


        $scope.showSuccessAlert = function () {
            $modal.open({
                templateUrl: 'app/vendor/profile/success-alert.html',
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

        $scope.showErrorLoginAlert = function () {
            $modal.open({
                templateUrl: 'app/vendor/profile/error-alert.html',
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

    }
})();

