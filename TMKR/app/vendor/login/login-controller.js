'use strict';

angular.module('app.vendor')
  .controller('VendorLoginController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$modal',
      function ($scope, $rootScope, $state, AuthenticationService, $modal) {
          
          AuthenticationService.clearCredentials('cookievendor');
          var parentController = $scope.$parent;
          this.cred = null;
          $scope.login = function () {
              $scope.dataLoading = true;
              this.cred = { Username: $scope.username, Password: $scope.password, type: 'vendor' };
              AuthenticationService.login(this.cred, onSuccessfulLogin, onFailedLogin);
          };

          function onSuccessfulLogin(data) {
              $scope.dataLoading = false;
              AuthenticationService.setCredentials($scope.username, $scope.password, data, 'cookievendor');
              parentController.vendorusername = AuthenticationService.getUsername('cookievendor');
              $state.go("vendor.home");
          }

          function onFailedLogin(data) {
              AuthenticationService.clearCredentials('cookievendor');
              $scope.dataLoading = false;
              $scope.error = data;
              $scope.showErrorAlert();
          }

          $scope.showErrorAlert = function () {
              $modal.open({
                  templateUrl: 'app/vendor/login/error-alert.html',
                  controller: function ($scope, $modalInstance) {
                      $scope.dismiss= function () {
                          $modalInstance.dismiss('cancel');
                      };
                  },
              });
          }
      }
    ]);