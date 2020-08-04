(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('CustomersController', CustomersController);

    CustomersController.$inject = ['$scope', '$http'];

    function CustomersController($scope, $http) {

        $scope.customers = [];

        $scope.onInit = function () {
            var config = {
                method: 'GET',
                url: '/api/admin/getCustomers'
            };
            $http(config)
              .success(function (response) {
                  $scope.customers = response;
              })
              .error(function (response) {
                  alert('No Customers Found');
              });
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
                  alert('Error');
              });
        }
    }
})();

