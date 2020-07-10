(function () {
    'use strict';

    angular.module('app.customer')

        .controller('MaterialEstimate', ['$scope',
            function ($scope) {

                $scope.coveredarea = null;
                $scope.height = null;

                $scope.walls = [];
                $scope.results = false;


                $scope.addWall = function () {
                    $scope.walls.push({length:null,multiplier:null});
                }

                $scope.removeWall = function (index) {
                    $scope.walls.splice(index,1);
                }

                $scope.reset = function () {
                    $scope.coveredarea = null;
                    $scope.height = null;
                    $scope.walls = [];
                    $scope.results = false;
                }
                


                //$scope.onInit = function () {
                //    $http.get(API_URL + '/vendor/getProdTypes')
                //        .success(function (response) {
                //            if (typeof successCallback === 'function') {
                //                $scope.productTypes = response;
                //            }
                //        })
                //        .error(function (response) {
                //            if (typeof errorCallback === 'function') {
                //                alert('Failure DropDown Fill');
                //            }
                //        });

                //    getAdvtDetails();
                //}

                //var getAdvtDetails = function () {
                //    var config = {
                //        method: 'GET',
                //        url: '/api/customer/getProdAdvt/' + $scope.id
                //    };

                //    $http(config)
                //    .success(function (response) {
                //        $scope.advt = response;
                //        $scope.advt.Quantity = null;
                //        if ($scope.advt.DLVRY_AVLB === true) {
                //            $scope.advt.DLVRY_AVLB = 'Yes';
                //        } else {
                //            $scope.advt.DLVRY_AVLB = 'No';
                //        }
                //    })
                //    .error(function (response) {

                //    });
                //}

            }])
})();
