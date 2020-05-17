(function () {
    'use strict';

    angular
        .module('app.vendor')
        .controller('VendorProfileController', VendorProfileController);

    VendorProfileController.$inject = ['$scope', '$http', '$state', 'AuthenticationService'];

    function VendorProfileController($scope, $http, $state, AuthenticationService) {
        $scope.credentials = {};
        $scope.profileForm = {};

        $scope.user = AuthenticationService.getUserObject('cookievendor');

        $scope.credentials = $scope.user;

        $scope.credentials.CRNT_PSWD = null;

        //when the form is submitted
        $scope.submit = function () {
            $scope.credentials;
            if (!profileForm.$invalid) {
                $http.post('/api/customer/updateprofile', JSON.stringify($scope.credentials))
                .success(function (response) {
                    AuthenticationService.setCredentials($scope.credentials.USR_NME, $scope.credentials.PSWD, $scope.credentials, 'cookievendor');
                    alert('Success');
                    $state.go('customer.profiledetails');
                })
                .error(function (response) {
                    alert(JSON.stringify(response));
                });
            } else {
                vm.error = true;
                return;
            }
        };

    }
})();

