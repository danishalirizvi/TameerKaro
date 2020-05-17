﻿(function () {
    'use strict';

    angular
        .module('app.vendor')
        .controller('CreateAdvertisementController', CreateAdvertisementController);

    CreateAdvertisementController.$inject = ['$scope', '$http', '$state', 'VendorService', 'AuthenticationService', '$modal'];

    function CreateAdvertisementController($scope, $http, $state, VendorService, AuthenticationService, $modal) {

        $scope.advt = {};
        $scope.advtForm = {};
        $scope.error = false;
        $scope.isLoadingCategories = true;
        $scope.submitted = false;
        $scope.productTypes = [];
        $scope.advtStatus = [];
        $scope.dlvryAlvb = [{ 'DLVRY_AVLB': 1, 'NME': 'Yes' }, { 'DLVRY_AVLB': 0, 'NME': 'No' }];


        $scope.onInit = function () {
            VendorService.getProductTypes(onSuccess, onFailed);
            VendorService.getAdvtStatus(onSuccessRes, onFailedRes);
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

        $scope.submit = function () {
            var venderid = AuthenticationService.getLoginVndrId('cookievendor');
            if (!venderid) {
                $scope.showErrorLoginAlert();
                alert("Kindly Login To Proceed!!");
                return;
            } else {
                $scope.advt.VNDR_ID = venderid;
                VendorService.createAdvt($scope.advt, successSubmit, errorSubmit);
            }
        }

        function successSubmit(response) {
            $scope.showSuccessAlert();
            $state.go("vendor.home");
        }

        function errorSubmit(response) {
            alert('Error');
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
    }
})();

