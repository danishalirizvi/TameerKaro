(function () {
    'use strict';
    angular
        .module('app.vendor')
        .controller('VendorProfileDetailController', VendorProfileDetailController);

    VendorProfileDetailController.$inject = ['$scope', '$state', 'AuthenticationService'];

    function VendorProfileDetailController($scope, $state, AuthenticationService) {

        $scope.user = AuthenticationService.getUserObject('cookievendor');

        $scope.editprofile = function () {
            $state.go("vendor.profile");
        }
    }
})();