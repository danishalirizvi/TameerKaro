(function () {
    'use strict';
    angular
        .module('app.vendor')
        .controller('ActiveAdvtsContoller', ActiveAdvtsContoller)
    ActiveAdvtsContoller.$inject = ['$scope', '$http', 'AuthenticationService'];

    function ActiveAdvtsContoller($scope, $http, AuthenticationService) {

        $scope.advts = [];

        $scope.onInit = function () {
            var vndrId = AuthenticationService.getLoginVndrId('cookievendor');
            var config = {
                method: 'GET',
                url: '/api/vendor/' + vndrId +'/activeAdts' 
            };

            $http(config)
            .success(function (response) {
                $scope.advts = response;
            })
            .error(function (response) {
                
            });
        }
    }
})();