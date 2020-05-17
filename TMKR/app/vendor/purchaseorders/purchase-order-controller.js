(function () {
    'use strict';

    angular
        .module('app.vendor')
        .controller('PurchaseOrderController', PurchaseOrderController);

    PurchaseOrderController.$inject = ['$scope', 'VendorService', 'AuthenticationService'];

    function PurchaseOrderController($scope, VendorService, AuthenticationService) {
        $scope.ordersparent = [];

        $scope.orderschild = [];

        $scope.childShow = true;

        $scope.onInit = function () {
            VendorService.getPurchaseOrders(AuthenticationService.getLoginVndrId('cookievendor'), onSuccess, onFailed);
        }

        function onSuccess(response) {
            console.log(JSON.stringify(response));
            $scope.ordersparent = response;
        }

        function onFailed(response) {
            alert('Failure DropDown Fill');
        }

    }
})();

