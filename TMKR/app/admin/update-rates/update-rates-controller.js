(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('UpdateRatesController', UpdateRatesController);

    UpdateRatesController.$inject = ['$scope', '$http', 'VendorService'];

    function UpdateRatesController($scope, $http, VendorService) {

        $scope.productTypes = [];
        $scope.unit = [];

        $scope.brickPrice = 0;
        $scope.cementPrice = 0;
        $scope.sandPrice = 0;
        $scope.gravelPrice = 0;
        $scope.steelPrice = 0;

        $scope.data = { Rate:null, PROD_TYPE_ID:null };


        $scope.onInit = function () {
            VendorService.getProductTypes(onSuccess, onFailed);
            getRates();
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
                  $scope.onInit();
              })
              .error(function (response) {
                  alert('Rate not Updated!');
              });
        }


        var getRates = function () {
            $http.get('/api/customer/getRates')
                .success(function (response) {
                    response.forEach(function (type) {
                        if (type.Prod_Type_ID === 1) {
                            $scope.brickPrice = type.Rate;
                        } else if (type.Prod_Type_ID === 2) {
                            $scope.cementPrice = type.Rate;
                        } else if (type.Prod_Type_ID === 3) {
                            $scope.steelPrice = type.Rate;
                        } else if (type.Prod_Type_ID === 4) {
                            $scope.sandPrice = type.Rate;
                        } else if (type.Prod_Type_ID === 5) {
                            $scope.gravelPrice = type.Rate;
                        }
                    });
                })
                .error(function (response) {
                    alert('Rate not Updated!');
                });
        }
    }
})();

