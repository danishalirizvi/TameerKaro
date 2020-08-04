(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdvertisementsController', AdvertisementsController);

    AdvertisementsController.$inject = ['$scope', '$http'];

    function AdvertisementsController($scope, $http) {

        $scope.advertisements = [];

        $scope.onInit = function () {
            var config = {
                method: 'GET',
                url: '/api/admin/getAdvertisements'
            };
            $http(config)
              .success(function (response) {
                  $scope.advertisements = response;
                  $scope.advertisements.forEach(function (advt) {
                      if (advt.DLVRY_AVLB === true) {
                          advt.DLVRY_AVLB = 'Yes';
                      } else {
                          advt.DLVRY_AVLB = 'No';
                      }
                  });
              })
              .error(function (response) {
                  alert('No Advertisements Found');
              });
        }

        $scope.block = function (advtid) {
            $scope.action('/api/admin/blockAdvt/', advtid);
        }

        $scope.unblock = function (advtid) {
            $scope.action('/api/admin/unblockAdvt/', advtid);
        }

        $scope.action = function (apiurl, advtid) {
            var config = {
                method: 'post',
                url: apiurl + advtid
            };
            $http(config)
              .success(function (response) {
                  $scope.onInit();
              })
              .error(function (response) {
                  alert('Error');
              });
        }
    }
})();
