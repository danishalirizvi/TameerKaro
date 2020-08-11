(function () {
    'use strict';

    angular
        .module('app.vendor')
        .controller('CreateAdvertisementController', CreateAdvertisementController);

    CreateAdvertisementController.$inject = ['$scope', '$http', '$state', 'VendorService', 'AuthenticationService', '$modal', 'Upload', '$timeout'];

    function CreateAdvertisementController($scope, $http, $state, VendorService, AuthenticationService, $modal, Upload, $timeout) {

        $scope.advt = {};
        $scope.advtForm = {};
        $scope.error = false;
        $scope.isLoadingCategories = true;
        $scope.submitted = false;
        $scope.productTypes = [];
        $scope.advtStatus = [];
        $scope.dlvryAlvb = [{ 'DLVRY_AVLB': 1, 'NME': 'Yes' }, { 'DLVRY_AVLB': 0, 'NME': 'No' }];

        $scope.unit = [];

        $scope.showLoading = false;


        $scope.onInit = function () {
            $scope.showLoading = true;
            VendorService.getProductTypes(onSuccess, onFailed);
            VendorService.getAdvtStatus(onSuccessRes, onFailedRes);
            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        }

        function onSuccess(response) {
            $scope.productTypes = response;
            angular.forEach($scope.productTypes, function (value, key) {
                $scope.unit.push(value.Unit);
            });
        }

        function onFailed(response) {
            alert('Server not Responding. Try Again Later');
        }

        function onSuccessRes(response) {
            $scope.advtStatus = response;
        }

        function onFailedRes(response) {
            alert('Server not Responding. Try Again Later');
        }

        $scope.submit = function (photo) {
            var venderid = AuthenticationService.getLoginUserId('cookievendor');
            if (!venderid) {
                $scope.showErrorLoginAlert();
                alert("Server not Responding. Try Again Later");
                return;
            } else {
                $scope.advt.VNDR_ID = venderid;
                if (photo === undefined || photo === null) {
                    $scope.advt.Path = null;
                } else {
                    $scope.advt.Path = photo.Path;
                }
                VendorService.createAdvt($scope.advt, successSubmit, errorSubmit);
            }
        }

        function successSubmit(response) {
            $scope.showSuccessAlert();
            $state.go("vendor.activeadvts");
        }

        function errorSubmit(response) {
            alert('Server not Responding. Try Again Later');
        }

        $scope.showSuccessAlert = function () {
            $modal.open({
                templateUrl: 'app/vendor/advertisements/success-alert.html',
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
                templateUrl: 'app/vendor/advertisements/error-login-alert.html',
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

        $scope.uploadPic = function (file) {
            if (file === undefined || file === null) {
                $scope.submit();
            }
            else {
                file.upload = Upload.upload({
                    url: '/api/file/add',
                    data: { file: file},
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        $scope.submit(response.data.Photo);
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        }
    }
})();

