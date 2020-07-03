(function () {
    'use strict';

    angular
        .module('app.customer')
        .controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'AuthenticationService', '$http'];

    function OrderController($scope,  AuthenticationService, $http) {

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

        $scope.orderAction = function (id, action) {

            data.id = id;
            data.action = action;

            alert(JSON.stringify(data));

            $http.post('/api/vendor/orderaction', JSON.stringify(data))
                .success(function (response) {
                    alert('Success');
                    $scope.onInit();
                })
                .error(function (response) {
                    alert('Error');
                });
        }
    }
})();

