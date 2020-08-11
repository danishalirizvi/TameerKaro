(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('VendorsController', VendorsController);

    VendorsController.$inject = ['$scope', 'AuthenticationService', '$http', '$timeout'];

    function VendorsController($scope, AuthenticationService, $http, $timeout) {

        $scope.vendors = [];

        $scope.showLoading = false;

        $scope.onInit = function () {
            $scope.showLoading = true;
            var config = {
                method: 'GET',
                url: '/api/admin/getVendors'
            };
            $http(config)
              .success(function (response) {
                  $scope.vendors = response;
              })
              .error(function (response) {
                  alert('Server not Responding. Try Again Later');
              });
            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
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
                  alert('Server not Responding. Try Again Later');
              });
        }
    }
})();
