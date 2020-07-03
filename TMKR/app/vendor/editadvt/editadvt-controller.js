(function () {
    'use strict';
    angular
        .module('app.vendor')
        .controller('EdirtAdvtController', EdirtAdvtController);
    EdirtAdvtController.$inject = ['$scope', '$state', 'Advertisement', '$stateParams', 'VendorService', '$http', '$modal', 'Upload', '$timeout'];

    function EdirtAdvtController($scope, $state, Advertisement, $stateParams, VendorService, $http, $modal, Upload, $timeout) {

        $scope.advt = {};
        $scope.productTypes = [];
        $scope.advtStatus = [];
        $scope.dlvryAlvb = [{ 'DLVRY_AVLB': true, 'NME': 'Yes' }, { 'DLVRY_AVLB': false, 'NME': 'No' }];
        $scope.id = $stateParams.advtId;

        $scope.onInit = function () {
            VendorService.getProductTypes(onSuccess, onFailed);
            VendorService.getAdvtStatus(onSuccessRes, onFailedRes);
            getAdvtDetails();
        }

        function onSuccess(response) {
            $scope.productTypes = response;
        }

        function onFailed(response) {
            alert('Failure DropDown Fill');
        }

        function onSuccessRes(response) {
            $scope.advtStatus = response;
        }

        function onFailedRes(response) {
            alert('Failure DropDown Fill 2');
        }

        var getAdvtDetails = function () {
            var config = {
                method: 'GET',
                url: '/api/vendor/' + $scope.id + '/advtdetail'
            };

            $http(config)
            .success(function (response) {
                $scope.advt = response;
            })
            .error(function (response) {

            });
        }

        $scope.submit = function (photo) {
            if (photo != undefined || photo != null) {
                $scope.advt.ImagePath = photo.Path;
            } 
            VendorService.updateAdvt($scope.advt, successSubmit, errorSubmit);
        }

        function successSubmit(response) {
            $scope.showSuccessAlert();
            $state.go("vendor.activeadvts");
        }

        function errorSubmit(response) {
            alert('Error');
        }

        $scope.showSuccessAlert = function () {
            $modal.open({
                templateUrl: 'app/vendor/editadvt/success-alert.html',
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

        $scope.uploadpic = function (file) {
            if (file === undefined || file === null) {
                alert('old pic');
                $scope.submit();
            }
            else {
                file.upload = Upload.upload({
                    url: '/api/file/add',
                    data: { file: file },
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