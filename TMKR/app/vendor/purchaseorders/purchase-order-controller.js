(function () {
    'use strict';

    angular
        .module('app.vendor')
        .controller('PurchaseOrderController', PurchaseOrderController);

    PurchaseOrderController.$inject = ['$scope', 'VendorService', 'AuthenticationService', '$http'];

    function PurchaseOrderController($scope, VendorService, AuthenticationService, $http) {

        $scope.active = 'New';

        $scope.setactive = function (active) {
            $scope.active = active;
        }

        $scope.ordersparent = [];

        $scope.orderschild = [];

        $scope.childShow = true;

        var data = {};

        $scope.onInit = function () {
            VendorService.getPurchaseOrders(AuthenticationService.getLoginUserId('cookievendor'), onSuccess, onFailed);
        }

        function onSuccess(response) {
            $scope.ordersparent = response;
        }

        function onFailed(response) {
            alert('Failure DropDown Fill');
        }

        $scope.orderAction = function (id,action) {

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

