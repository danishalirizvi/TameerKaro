+
'use strict';

angular.module('app')
  .service('AuthenticationService',
    ['$http', '$cookies', 'Base64',
      function ($http, $cookies, Base64) {

          this.checkUserType = function () {

              var credentialsCustomer = retrieveCredentials('cookiecustomer');
              var credentialsVendor = retrieveCredentials('cookievendor');
              var credentialsAdmin = retrieveCredentials('cookieadmin');

              if (credentialsCustomer === null && credentialsVendor === null && credentialsAdmin === null) {
                  return null;
              } else if (credentialsVendor === null && credentialsAdmin === null) {
                  return 'cookiecustomer';
              } else if (credentialsCustomer === null && credentialsAdmin === null) {
                  return 'cookievendor';
              } else if (credentialsCustomer === null && credentialsVendor === null) {
                  return 'cookieadmin';
              }
          }

          var storeCredentials = function (credentials) {
              $cookies.putObject(credentials.cookieName, credentials);
          };

          var removeCredentials = function (cookieName) {
              $cookies.remove(cookieName);
          };

          var retrieveCredentials = function (cookieName) {
              var credentials = $cookies.getObject(cookieName);

              return credentials === undefined ? null : credentials;
          };

          this.login = function (cred, successCallback, errorCallback) {
              var apiUrl;
              if (cred.type == 'admin') {
                  apiUrl = '/api/admin/Login';
              }
              else if (cred.type == 'customer') {
                  apiUrl = '/api/customer/Login';
              }
              else if (cred.type == 'vendor') {
                  apiUrl = '/api/vendor/Login';
              }
              else {
              }
              $http.post(apiUrl, JSON.stringify(cred))
                .success(function (response) {
                    if (typeof successCallback === 'function') {
                        successCallback(response);
                    }
                })
                .error(function (response) {
                    if (typeof errorCallback === 'function') {
                        errorCallback(response);
                    }
                });
          };

          this.setCredentials = function (username, password, data, cookieName) {
              var credentials = {
                  username: username,
                  user: data,
                  cookieName: cookieName
              };
              storeCredentials(credentials);
              //alert(JSON.stringify(cookieName + credentials.username));
          };

          this.clearCredentials = function (cookieName) {
              removeCredentials(cookieName);
          };

          this.getUsername = function (cookieName) {
              var credentials = retrieveCredentials(cookieName);
              return credentials === null ? null : credentials.username;
          };

          this.isAuthenticated = function (cookieName) {
              var credentials = retrieveCredentials(cookieName);
              return credentials === null ? false : true;
          };

          this.getLoginUserId = function (cookieName) {
              var credentials = retrieveCredentials(cookieName);
              return credentials === null ? null : credentials.user.ID;
          };

          this.getUserObject = function (cookieName) {
              var credentials = retrieveCredentials(cookieName);

              return credentials === null ? null : credentials.user;
          };
      }]);