(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminHomeController', AdminHomeController);

    AdminHomeController.$inject = ['$scope', '$http'];

    function AdminHomeController($scope, $http) {

        $scope.messages = [];

        $scope.onInit = function () {
            var config = {
                method: 'GET',
                url: '/api/admin/getMessages'
            };
            $http(config)
              .success(function (response) {
                  $scope.messages = response;
              })
              .error(function (response) {
                  alert('No Messages Found');
              });
        }
    }
})();

