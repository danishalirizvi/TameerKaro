'use strict';

angular.module('app.admin')
  .controller('AdminLoginController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$modal',
      function ($scope, $rootScope, $state, AuthenticationService, $modal) {
          
          AuthenticationService.clearCredentials('cookiecustomer');
          var parentController = $scope.$parent;
          this.cred = null;
          $scope.login = function () {
              $scope.dataLoading = true;
              this.cred = { Username: $scope.username, Password: $scope.password, type:'admin' };
              AuthenticationService.login(this.cred, onSuccessfulLogin, onFailedLogin);
          };

          function onSuccessfulLogin(data) {
              $scope.dataLoading = false;
              AuthenticationService.setCredentials($scope.username, $scope.password, data, 'cookieadmin');
              parentController.adminusername = AuthenticationService.getUsername('cookieadmin');
              $state.go("admin.home");
          }

          function onFailedLogin(data) {
              AuthenticationService.clearCredentials('cookieadmin');
              $scope.dataLoading = false;
              $scope.error = data;
              $scope.showErrorAlert();
          }

          $scope.showErrorAlert = function () {
              $modal.open({
                  templateUrl: 'app/admin/login/error-alert.html',
                  controller: function ($scope, $modalInstance) {
                      $scope.dismiss = function () {
                          $modalInstance.dismiss('cancel');
                      };
                  }
              });
          }
      }
    ]);