(function () {
    'use strict';

    angular
        .module('app.customer')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$http', '$state', 'AuthenticationService'];

    function ProfileController($scope, $http, $state, AuthenticationService) {
        $scope.credentials = {};
        $scope.profileForm = {};
        $scope.error = false;
        $scope.submitted = false;

        $scope.credentials = AuthenticationService.getUserObject('cookiecustomer');

        $scope.credentials.PHNE = parseInt($scope.credentials.PHNE);


        $scope.credentials.PSWD = null;
        $scope.credentials.confirmpassword = null;
        $scope.credentials.CRNT_PSWD = null;

        //when the form is submitted
        $scope.submit = function () {
            $scope.submitted = true;
            if (!$scope.profileForm.$invalid && $scope.credentials.PSWD === $scope.credentials.confirmpassword) {
                $http.post('/api/customer/updatecustomerprofile', JSON.stringify($scope.credentials))
                .success(function (response) {
                    AuthenticationService.setCredentials(response.USR_NME, response.PSWD, response, 'cookiecustomer');
                    alert('Success');
                    $scope.submitted = false;
                    $state.go('customer.profiledetails');
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

