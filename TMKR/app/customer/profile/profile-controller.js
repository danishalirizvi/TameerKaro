(function () {
    'use strict';

    angular
        .module('app.customer')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$http', '$state', 'AuthenticationService'];

    function ProfileController($scope, $http, $state, AuthenticationService) {
        $scope.credentials = {};
        $scope.profileForm = {};

        $scope.user = AuthenticationService.getUserObject('cookiecustomer');

        $scope.credentials = $scope.user;

        $scope.credentials.CRNT_PSWD = null;

        //when the form is submitted
        $scope.submit = function () {
            $scope.credentials;
            if (!profileForm.$invalid) {
                $http.post('/api/customer/updateprofile', JSON.stringify($scope.credentials))
                .success(function (response) {
                    AuthenticationService.setCredentials($scope.credentials.USR_NME, $scope.credentials.PSWD, $scope.credentials, 'cookiecustomer');
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

