(function () {
    'use strict';

    angular
        .module('app.customer')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'AuthenticationService', '$http'];

    function OrderController($scope, AuthenticationService, $http) {

        $scope.active = 'Pending';

        $scope.setactive = function (active) {
            $scope.active = active;
        }

        $scope.ordersparent = [];

        $scope.orderschild = [];

        $scope.childShow = true;

        var data = {};

        $scope.onInit = function () {
            var Id = AuthenticationService.getLoginUserId('cookiecustomer');

            var config = {
                method: 'GET',
                url: '/api/customer/' + Id + '/getOrders'
            };
            $http(config)
              .success(function (response) {
                  $scope.ordersparent = response;
              })
              .error(function (response) {
                  alert('Failure DropDown Fill');
              });
        }

        //$scope.cancelorder = function (orders, index) {
        $scope.cancelorder = function (cartId) {
            //var order = orders[index].orderdetail;
            //$http.post('/api/customer/cancelorder', order)
            $http.post('/api/customer/cancelorder/'+cartId)
                .success(function (response) {
                    $scope.onInit();
                })
                .error(function (response) {
                    alert('Error');
                });
        }

        $scope.cancelorderitem = function (itemId) {
            //var order = orders[index].orderdetail;
            //$http.post('/api/customer/cancelorder', order)
            $http.post('/api/customer/cancelorderitem/' + itemId)
                .success(function (response) {
                    $scope.onInit();
                })
                .error(function (response) {
                    alert('Error');
                });
        }
    }
})();

