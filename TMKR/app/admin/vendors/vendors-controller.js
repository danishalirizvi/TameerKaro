(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('VendorsController', VendorsController);

    VendorsController.$inject = ['$scope', 'AuthenticationService', '$http'];

    function VendorsController($scope, AuthenticationService, $http) {

        $scope.vendors = [];

        $scope.onInit = function () {
            var config = {
                method: 'GET',
                url: '/api/admin/getVendors'
            };
            $http(config)
              .success(function (response) {
                  $scope.vendors = response;
              })
              .error(function (response) {
                  alert('No Vendors Found');
              });
        }

        $scope.block = function (vendorid) {
            $scope.action('/api/admin/blockVendor/', vendorid);
        }

        $scope.unblock = function (vendorid) {
            $scope.action('/api/admin/unblockVendor/', vendorid);
        }

        $scope.action = function (apiurl, vendorid) {
            var config = {
                method: 'post',
                url: apiurl + vendorid
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
