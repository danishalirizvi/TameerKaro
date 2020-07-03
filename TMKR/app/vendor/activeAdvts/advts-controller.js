(function () {
    'use strict';
    angular
        .module('app.vendor')
        .controller('ActiveAdvtsContoller', ActiveAdvtsContoller)
    ActiveAdvtsContoller.$inject = ['$scope', '$state', '$http', 'AuthenticationService', 'Advertisement'];

    function ActiveAdvtsContoller($scope, $state, $http, AuthenticationService, Advertisement) {

        $scope.advts = [];

        $scope.onInit = function () {
            var vndrId = AuthenticationService.getLoginUserId('cookievendor');
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

        $scope.editadvt = function (advt) {
            Advertisement.advt = advt;
            $state.go("vendor.editadvts", {
                customerid:advt.ID
            });
        }
    }
})();