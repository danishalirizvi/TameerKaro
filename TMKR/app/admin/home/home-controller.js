(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminHomeController', AdminHomeController);

    AdminHomeController.$inject = ['$scope', '$http', '$timeout'];

    function AdminHomeController($scope, $http, $timeout) {

        $scope.messages = [];
        $scope.showLoading = false;

        $scope.onInit = function () {

            $scope.showLoading = true;
            var config = {
                method: 'GET',
                url: '/api/admin/getMessages'
            };
            $http(config)
              .success(function (response) {
                  $scope.messages = response;
              })
              .error(function (response) {
                  alert('Server not Responding. Try Again Later');
              });
            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
        }
    }
})();

