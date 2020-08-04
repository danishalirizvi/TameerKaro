(function () {
    'use strict';

    angular.module('app.customer')

        .controller('MaterialEstimate', ['$scope',
            function ($scope) {

                
                $scope.brickArea = (5 * 3.5) / 144;
                $scope.brickVolume = (9 * 4.5 * 3) / 1728;
                $scope.bricksVolume = 0;
                $scope.volumeOfWall = 0;
                $scope.MortarVolumeWet = 0;
                $scope.MortarVolumeDry = 0;
                $scope.Cement = 0;

                $scope.totalAreaWalls = 0;
                $scope.NoOfBricks = 0;
                $scope.CementBags = 0;
                $scope.Sand = 0;
                $scope.coveredarea = null;
                $scope.height = null;
                $scope.walls = [];
                $scope.results = false;
                

                $scope.addWall = function () {
                    $scope.walls.push({ length: null, multiplier: null });
                    $scope.results = false;
                }

                $scope.removeWall = function (index) {
                    $scope.walls.splice(index, 1);
                    if ($scope.walls.length == 0) {
                        $scope.results = false;
                    } else {
                        $scope.calculate();
                    }
                }


                $scope.calculate = function () {
                    if ($scope.coveredarea != null && $scope.height != null) {
                        $scope.totalAreaWalls = 0;
                        $scope.results = true;
                        $scope.walls.forEach(function (wall) {
                            $scope.totalAreaWalls = $scope.totalAreaWalls + ((wall.length * wall.multiplier) * $scope.height);
                        });

                        $scope.NoOfBricks = Math.round($scope.totalAreaWalls / $scope.brickArea);

                        $scope.volumeOfWall = $scope.totalAreaWalls * 0.75;

                        $scope.bricksVolume = $scope.NoOfBricks * $scope.brickVolume;

                        $scope.MortarVolumeWet = $scope.volumeOfWall - $scope.bricksVolume;

                        $scope.MortarVolumeDry = $scope.MortarVolumeWet * 1.33;

                        $scope.Cement = $scope.MortarVolumeDry / 7;

                        $scope.CementBags = Math.round($scope.Cement * 0.8156);
                        if ($scope.CementBags < 1) {
                            $scope.CementBags = ($scope.Cement * 0.8156).toFixed(2);
                        }

                        $scope.Sand = Math.round(($scope.MortarVolumeDry * 6) / 7);
                        if ($scope.Sand < 1) {
                            $scope.Sand = (($scope.MortarVolumeDry * 6) / 7).toFixed(2);
                        }
                    } else {
                        alert("Enter Valid Values");
                    }
                    
                }

                $scope.reset = function () {
                    $scope.totalAreaWalls = 0;
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
