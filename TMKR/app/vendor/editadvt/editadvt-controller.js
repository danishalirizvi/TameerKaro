(function () {
    'use strict';
    angular
        .module('app.vendor')
        .controller('EdirtAdvtController', EdirtAdvtController);
    EdirtAdvtController.$inject = ['$scope', '$state', 'Advertisement', '$stateParams', 'VendorService', '$http', '$modal'];

    function EdirtAdvtController($scope, $state, Advertisement, $stateParams, VendorService, $http, $modal) {

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

        $scope.submit = function () {
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