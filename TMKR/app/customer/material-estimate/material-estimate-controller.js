(function () {
    'use strict';

    angular.module('app.customer')

        .controller('MaterialEstimate', ['$scope', '$http',
            function ($scope, $http) {

                $scope.brickPrice = 0;
                $scope.cementPrice = 0;
                $scope.sandPrice = 0;
                $scope.gravelPrice = 0;
                $scope.steelPrice = 0;

                $scope.NoOfBricks = 0;
                $scope.CementBags = 0;
                $scope.Sand = 0;

                $scope.steel = 0;
                $scope.cementRoof = 0;
                $scope.sandRoof = 0;
                $scope.gravelRoof = 0;

                $scope.cementFloor = 0;
                $scope.sandFloor = 0;
                $scope.gravelFloor = 0;

                $scope.coveredarea = null;
                $scope.height = null;

                $scope.walls = [];

                $scope.results = false;
                $scope.cost = false;
                $scope.showerror = false;

                $scope.addWall = function () {
                    $scope.walls.push({ length: null, multiplier: null });
                }

                $scope.removeWall = function (index) {
                    $scope.walls.splice(index, 1);
                }

                $scope.calculate = function () {
                    if ($scope.coveredarea != null && $scope.height != null) {
                        $scope.showerror = true;
                        calculateWall();
                        calculateRoof();
                        calculateFloor();

                        getRates();
                    } else {
                        $scope.showerror = true;
                    }

                }

                var calculateWall = function () {

                    var brickArea = (5 * 3.5) / 144;
                    var brickVolume = (9 * 4.5 * 3) / 1728;

                    var bricksVolume = 0;

                    var volumeOfWall = 0;

                    var MortarVolumeWet = 0;
                    var MortarVolumeDry = 0;

                    var Cement = 0;

                    var totalAreaWalls = 0;

                    $scope.results = true;

                    $scope.walls.forEach(function (wall) {
                        totalAreaWalls = totalAreaWalls + ((wall.length * wall.multiplier) * $scope.height);
                    });

                    $scope.NoOfBricks = Math.round(totalAreaWalls / brickArea);

                    volumeOfWall = totalAreaWalls * 0.75;

                    bricksVolume = $scope.NoOfBricks * brickVolume;

                    MortarVolumeWet = volumeOfWall - bricksVolume;

                    MortarVolumeDry = MortarVolumeWet * 1.54;

                    Cement = MortarVolumeDry / 7;

                    $scope.CementBags = Math.round(Cement * 0.8156);
                    if ($scope.CementBags < 1) {
                        $scope.CementBags = (Cement * 0.8156).toFixed(2);
                    }

                    $scope.Sand = Math.round((MortarVolumeDry * 6) / 7);
                    if ($scope.Sand < 1) {
                        $scope.Sand = ((MortarVolumeDry * 6) / 7).toFixed(2);
                    }
                }

                var calculateRoof = function () {

                    var steelPerSqft = 0.906;
                    var concreteVolumeWet = ($scope.coveredarea * 0.5) - ($scope.steel / 222);
                    var concreteVolumeDry = concreteVolumeWet * 1.54;


                    $scope.steel = ($scope.coveredarea * steelPerSqft).toFixed(2);

                    $scope.cementRoof = Math.round(((1 / 7) * concreteVolumeDry) * 0.8156);
                    if ($scope.cementRoof < 1) {
                        $scope.cementRoof = (((1 / 7) * concreteVolumeDry) * 0.8156).toFixed(2);
                    }

                    $scope.sandRoof = Math.round((concreteVolumeDry * 2) / 7);
                    if ($scope.sandRoof < 1) {
                        $scope.sandRoof = ((concreteVolumeDry * 2) / 7).toFixed(2);
                    }

                    $scope.gravelRoof = Math.round((concreteVolumeDry * 4) / 7);
                    if ($scope.gravelRoof < 1) {
                        $scope.gravelRoof = ((concreteVolumeDry * 4) / 7).toFixed(2);
                    }
                }

                var calculateFloor = function () {

                    var concreteVolumeWet = $scope.coveredarea * 0.5;
                    var concreteVolumeDry = concreteVolumeWet * 1.54;

                    $scope.cementFloor = Math.round(((1 / 7) * concreteVolumeDry) * 0.8156);
                    if ($scope.cementFloor < 1) {
                        $scope.cementFloor = (((1 / 7) * concreteVolumeDry) * 0.8156).toFixed(2);
                    }

                    $scope.sandFloor = Math.round((concreteVolumeDry * 2) / 7);
                    if ($scope.sandFloor < 1) {
                        $scope.sandFloor = ((concreteVolumeDry * 2) / 7).toFixed(2);
                    }

                    $scope.gravelFloor = Math.round((concreteVolumeDry * 4) / 7);
                    if ($scope.gravelFloor < 1) {
                        $scope.gravelFloor = ((concreteVolumeDry * 4) / 7).toFixed(2);
                    }
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


                $scope.reset = function () {
                    $scope.totalAreaWalls = 0;
                    $scope.coveredarea = null;
                    $scope.height = null;
                    $scope.walls = [];
                    $scope.results = false;
                    $scope.showerror = false;
                    $scope.cost = false;
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
