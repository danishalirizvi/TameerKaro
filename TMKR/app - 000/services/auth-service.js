'use strict';

angular.module('app')
  .service('AuthenticationService',
    ['$http', '$cookies', 'Base64',
      function ($http, $cookies, Base64) {

          var addHttpHeader = function (authdata) {
              $http.defaults.headers.common.Authorization = 'Basic ' + authdata;
          };

          var addHttpHeaderCredentials = function (username, password) {
              addHttpHeader(Base64.encode(username + ':' + password));
          };

          var removeHttpHeader = function () {
              $http.defaults.headers.common.Authorization = 'Basic ';
          };

          var storeCredentials = function (credentials) {
              $cookies.putObject('authentication-credentials', credentials);
          };

          var removeCredentials = function () {
              $cookies.remove('authentication-credentials');
          };

          var retrieveCredentials = function () {
              var credentials = $cookies.getObject('authentication-credentials');

              return credentials === undefined ? null : credentials;
          };

          this.loginFromCookie = function () {
              var credentials = retrieveCredentials();

              if (credentials !== null) {
                  addHttpHeader(this.getAuthData());

                  return true;
              } else {
                  return false;
              }
          };

          this.login = function (username, password, successCallback, errorCallback) {
              addHttpHeaderCredentials(username, password);
              $http.post('/api/customer/Login', { username: username, password: password })
                .success(function (response) {
                    if (typeof successCallback === 'function') {
                        successCallback(response);
                    }
                })
                .error(function (response) {
                    if (typeof errorCallback === 'function') {
                        removeHttpHeader();
                        errorCallback(response);
                    }
                });
          };

          this.setCredentials = function (username, password, data) {
              var credentials = {
                  username: username,
                  user: data,
                  authdata: Base64.encode(username + ':' + password)
              };

              addHttpHeader(credentials.authdata);
              storeCredentials(credentials);
          };

          this.clearCredentials = function () {
              removeCredentials();
              removeHttpHeader();
          };

          this.getUsername = function () {
              var credentials = retrieveCredentials();
              return credentials === null ? null : credentials.username;
          };

          this.isAuthenticated = function () {
              var credentials = retrieveCredentials();
              return credentials === null ? false : true;
          };


          this.getUserLoggedInFlag = function () {
              var credentials = retrieveCredentials();
              return credentials === null ? null : credentials.isUserLoggedIn;
          };

          this.getAuthData = function () {
              var credentials = retrieveCredentials();

              return credentials === null ? null : credentials.authdata;
          };

          this.getUserObject = function () {
              var credentials = retrieveCredentials();

              return credentials === null ? null : credentials.user;
          };
      }]);