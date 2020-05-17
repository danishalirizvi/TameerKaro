(function () {
    'use strict';
    angular.module('app')
      .controller('RootController', ['$scope', 'AuthenticationService',
        function ($scope, AuthenticationService) {
            $scope.username = AuthenticationService.getUsername();
        }]);
})();