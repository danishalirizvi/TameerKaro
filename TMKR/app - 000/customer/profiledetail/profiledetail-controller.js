(function () {
    'use strict';
    angular
        .module('app.customer')
        .controller('ProfileDetailController', ProfileDetailController);

    ProfileDetailController.$inject = ['$scope','$state', 'AuthenticationService'];

    function ProfileDetailController($scope, $state, AuthenticationService) {
        
        $scope.user = AuthenticationService.getUserObject();

        $scope.editprofile = function () {
            $state.go("profile");
        }
    }
})();