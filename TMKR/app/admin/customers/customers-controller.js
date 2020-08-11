(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('CustomersController', CustomersController);

    CustomersController.$inject = ['$scope', '$http', '$timeout'];

    function CustomersController($scope, $http, $timeout) {

        $scope.customers = [];

        $scope.showLoading = false;

        $scope.onInit = function () {
            $scope.showLoading = true;
            var config = {
                method: 'GET',
                url: '/api/admin/getCustomers'
            };
            $http(config)
              .success(function (response) {
                  $scope.customers = response;
              })
              .error(function (response) {
                  alert('Server not Responding. Try Again Later');
              });

            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        }

        $scope.block = function (customerid) {
            $scope.action('/api/admin/blockCustomer/',customerid);
        }

        $scope.unblock = function (customerid) {
            $scope.action('/api/admin/unblockCustomer/', customerid);
        }

        $scope.action = function (apiurl, customerid) {
            var config = {
                method: 'post',
                url: apiurl + customerid
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

