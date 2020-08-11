(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('OrdersController', OrdersController);

    OrdersController.$inject = ['$scope', '$http', '$timeout'];

    function OrdersController($scope, $http, $timeout) {

        $scope.orders = [];

        $scope.showLoading = false;

        $scope.onInit = function () {
            $scope.showLoading = true;
            var config = {
                method: 'GET',
                url: '/api/admin/getOrders'
            };
            $http(config)
              .success(function (response) {
                  $scope.orders = response;
              })
              .error(function (response) {
                  alert('Server not Responding. Try Again Later');
              });
            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        }

        $scope.suspend = function (cartid) {
            $scope.action('/api/admin/suspendOrder/', cartid);
        }

        $scope.resume = function (cartid) {
            $scope.action('/api/admin/resumeOrder/', cartid);
        }

        $scope.action = function (apiurl, cartid) {
            var config = {
                method: 'post',
                url: apiurl + cartid
            };
            $http(config)
              .success(function (response) {
                  $scope.onInit();
              })
              .error(function (response) {
                  alert('Server not Responding. Try Again Later');
              });
        }


        $scope.suspendsingle = function (orderId) {
            $scope.action('/api/admin/suspendSingleOrder/', orderId);
        }

        $scope.resumesingle = function (orderId) {
            $scope.action('/api/admin/resumeSingleOrder/', orderId);
        }

        $scope.action = function (apiurl, orderId) {
            var config = {
                method: 'post',
                url: apiurl + orderId
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
