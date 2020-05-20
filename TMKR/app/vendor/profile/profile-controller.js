(function () {
    'use strict';

    angular
        .module('app.vendor')
        .controller('VendorProfileController', VendorProfileController);

    VendorProfileController.$inject = ['$scope', '$http', '$state', 'AuthenticationService'];

    function VendorProfileController($scope, $http, $state, AuthenticationService) {
        $scope.credentials = {};
        $scope.profileForm = {};
        $scope.error = false;
        $scope.submitted = false;

        $scope.user = AuthenticationService.getUserObject('cookievendor');

        $scope.user.PSWD = null;
        $scope.credentials = $scope.user;
        $scope.credentials.confirmpassword = null;
        $scope.credentials.CRNT_PSWD = null;

        //when the form is submitted
        $scope.submit = function () {
            $scope.submitted = true;
            if (!$scope.profileForm.$invalid && $scope.credentials.PSWD === $scope.credentials.confirmpassword) {
                $http.post('/api/vendor/updatevendorprofile', JSON.stringify($scope.credentials))
                .success(function (response) {
                    AuthenticationService.setCredentials(response.USR_NME, response.PSWD, response, 'cookievendor');
                    alert('Success');
                    $scope.submitted = false;
                    $state.go('vendor.profiledetails');
                })
                .error(function (response) {
                    $scope.submitted = false;
                    alert(JSON.stringify(response));
                });
            } else {
                $scope.submitted = false;
                $scope.error = true;
                alert('Passwords don not match');
                return;
            }
        };

    }
})();

