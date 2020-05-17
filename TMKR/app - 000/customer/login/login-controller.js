'use strict';

angular.module('app.customer')
  .controller('LoginController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', 'PATHS',
      function ($scope, $rootScope, $state, AuthenticationService, PATHS) {
          // reset login status
          AuthenticationService.clearCredentials();
          var parentController = $scope.$parent;
          $scope.login = function () {
              $scope.dataLoading = true;
              AuthenticationService.login($scope.username, $scope.password, onSuccessfulLogin, onFailedLogin);
          };

          function onSuccessfulLogin(data) {
              AuthenticationService.setCredentials($scope.username, $scope.password, data);
              parentController.username = AuthenticationService.getUsername();
              $state.go("customer.home");
          }

          function onFailedLogin(data) {
              AuthenticationService.clearCredentials();
              $scope.dataLoading = false;
              $scope.error = data.Message;
          }
      }
    ]);