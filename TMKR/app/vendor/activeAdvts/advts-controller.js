(function () {
    'use strict';
    angular
        .module('app.vendor')
        .controller('ActiveAdvtsContoller', ActiveAdvtsContoller)
    ActiveAdvtsContoller.$inject = ['$scope', '$state', '$http', 'AuthenticationService', 'Advertisement', '$timeout'];

    function ActiveAdvtsContoller($scope, $state, $http, AuthenticationService, Advertisement, $timeout) {

        $scope.advts = [];

        $scope.showLoading = false;

        $scope.onInit = function () {
            $scope.showLoading = true;
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
            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        }

        //$scope.editadvt = function (advt) {
        //    Advertisement.advt = advt;
        //    $state.go("vendor.editadvts", {
        //        advtId:advt.ID
        //    });
        //}

        $scope.deleteadvts = function (advtId) {
            
            var config = {
                method: 'POST',
                url: '/api/vendor/deleteAdvt/'+ advtId
            };

            $http(config)
            .success(function (response) {
                $scope.onInit();
            })
            .error(function (response) {
                alert('Server not Responding. Try Again Later');
            });
        }
    }
})();