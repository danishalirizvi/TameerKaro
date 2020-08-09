(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('UpdateRatesController', UpdateRatesController);

    UpdateRatesController.$inject = ['$scope', '$http', 'VendorService'];

    function UpdateRatesController($scope, $http, VendorService) {

        $scope.productTypes = [];
        $scope.unit = [];

        $scope.data = { Rate:null, PROD_TYPE_ID:null };


        $scope.onInit = function () {
            VendorService.getProductTypes(onSuccess, onFailed);
        }

        function onSuccess(response) {
            $scope.productTypes = response;
            angular.forEach($scope.productTypes, function (value, key) {
                $scope.unit.push(value.Unit);
            });
        }

        function onFailed(response) {
            alert('Failure DropDown Fill');
        }

        $scope.updateRate = function () {
            $http.post('/api/admin/updateRate', $scope.data)
              .success(function (response) {
                  $scope.data = { Rate: null, PROD_TYPE_ID: null };
              })
              .error(function (response) {
                  alert('Rate not Updated!');
              });
        }
    }
})();

