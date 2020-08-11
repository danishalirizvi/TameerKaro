(function () {
    'use strict';

    angular
        .module('app.vendor')
        .controller('PurchaseOrderController', PurchaseOrderController);

    PurchaseOrderController.$inject = ['$scope', 'VendorService', 'AuthenticationService', '$http', '$timeout'];

    function PurchaseOrderController($scope, VendorService, AuthenticationService, $http, $timeout) {

        $scope.active = 'New';

        $scope.setactive = function (active) {
            $scope.active = active;
        }

        $scope.ordersparent = [];

        $scope.orderschild = [];

        $scope.childShow = true;

        $scope.showLoading = false;

        var data = {};

        $scope.onInit = function () {
            $scope.showLoading = true;

            VendorService.getPurchaseOrders(AuthenticationService.getLoginUserId('cookievendor'), onSuccess, onFailed);

            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        }

        function onSuccess(response) {
            $scope.ordersparent = response;
        }

        function onFailed(response) {
            alert('Server not Responding. Try Again Later');
        }

        $scope.orderAction = function (id,action) {

            data.id = id;
            data.action = action;


            $http.post('/api/vendor/orderaction', JSON.stringify(data))
                .success(function (response) {
                    $scope.onInit();
                })
                .error(function (response) {
                    alert('Server not Responding. Try Again Later');
                });
        }


        $scope.singleorderAction = function (id, action) {

            data.id = id;
            data.action = action;


            $http.post('/api/vendor/singleorderaction', JSON.stringify(data))
                .success(function (response) {
                    $scope.onInit();
                })
                .error(function (response) {
                    alert('Server not Responding. Try Again Later');
                });
        }
    }
})();

