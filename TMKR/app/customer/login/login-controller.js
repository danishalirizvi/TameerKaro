'use strict';

angular.module('app.customer')
  .controller('LoginController',
    ['$scope', '$rootScope', '$state', 'AuthenticationService', '$modal',
      function ($scope, $rootScope, $state, AuthenticationService, $modal) {
          
          AuthenticationService.clearCredentials('cookiecustomer');
          var parentController = $scope.$parent;
          this.cred = null;
          $scope.login = function () {
              $scope.dataLoading = true;
              this.cred = { Username: $scope.username, Password: $scope.password, isCustomer: true };
              AuthenticationService.login(this.cred, onSuccessfulLogin, onFailedLogin);
          };

          function onSuccessfulLogin(data) {
              $scope.dataLoading = false;
              AuthenticationService.setCredentials($scope.username, $scope.password, data, 'cookiecustomer');
              parentController.customerusername = AuthenticationService.getUsername('cookiecustomer');
              $state.go("customer.home");
          }

          function onFailedLogin(data) {
              AuthenticationService.clearCredentials('cookiecustomer');
              $scope.dataLoading = false;
              $scope.error = data;
              $scope.showErrorAlert();
          }

          $scope.showErrorAlert = function () {
              $modal.open({
                  templateUrl: 'app/customer/login/error-alert.html',
                  controller: function ($scope, $modalInstance) {
                      $scope.dismiss = function () {
                          $modalInstance.dismiss('cancel');
                      };
                  }
              });
          }
      }
    ]);