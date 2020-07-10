(function () {
    'use strict';

    angular.module('app.customer')

        .controller('ProductController', ['$scope', '$http', 'API_URL', '$stateParams', 'ngCart',
            function ($scope, $http, API_URL, $stateParams, ngCart) {

                $scope.ngCart = ngCart;
                $scope.advt = {};
                $scope.productTypes = [];
                $scope.id = $stateParams.advtId;

                $scope.onInit = function () {
                    $http.get(API_URL + '/vendor/getProdTypes')
                        .success(function (response) {
                            if (typeof successCallback === 'function') {
                                $scope.productTypes = response;
                            }
                        })
                        .error(function (response) {
                            if (typeof errorCallback === 'function') {
                                alert('Failure DropDown Fill');
                            }
                        });
                    
                    getAdvtDetails();
                }

                var getAdvtDetails = function () {
                    var config = {
                        method: 'GET',
                        url: '/api/customer/getProdAdvt/' + $scope.id
                    };

                    $http(config)
                    .success(function (response) {
                        $scope.advt = response;
                        $scope.advt.Quantity = null;
                        if ($scope.advt.DLVRY_AVLB === true) {
                            $scope.advt.DLVRY_AVLB = 'Yes';
                        } else {
                            $scope.advt.DLVRY_AVLB = 'No';
                        }
                    })
                    .error(function (response) {

                    });
                }

            }])
})();
