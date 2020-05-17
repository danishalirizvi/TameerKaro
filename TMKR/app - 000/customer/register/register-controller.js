(function () {
    'use strict';

    angular
        .module('app.customer')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$http', '$state', '$window'];

    function RegisterController($scope, $http, $state, $window) {
        var vm = this;
        vm.credentials = {};
        vm.signupForm = {};
        vm.error = false;
        vm.submitted = false;
        var parentController = $scope.$parent;

        //when the form is submitted
        vm.submit = function () {
            vm.submitted = true;
            if (!vm.signupForm.$invalid) {
                $http.post('/api/customer/Register', JSON.stringify(vm.credentials))
                .success(function (response) {
                    $state.go('login');
                })
                .error(function (response) {
                    $state.go('home');
                });
            } else {
                vm.error = true;
                return;
            }
        };
    }
})();

