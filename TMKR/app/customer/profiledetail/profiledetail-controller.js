(function () {
    'use strict';
    angular
        .module('app.customer')
        .controller('ProfileDetailController', ProfileDetailController);

    ProfileDetailController.$inject = ['$scope', '$state', 'AuthenticationService', '$http', 'Upload', '$timeout'];

    function ProfileDetailController($scope, $state, AuthenticationService, $http, Upload, $timeout) {
        
        $scope.user = AuthenticationService.getUserObject('cookiecustomer');

        $scope.image = { Id: null, Path: null };

        $scope.picpath = null;

        $scope.editprofile = function () {
            $state.go("customer.profile");
        }

        $scope.onInit = function () {
            var customerid = AuthenticationService.getLoginUserId('cookiecustomer');
            var config = {
                method: 'GET',
                url: '/api/customer/getCustomerProfilePicPath/' + customerid
            };
            $http(config)
              .success(function (response) {
                  $scope.picpath = response;
              })
              .error(function (response) {
                  alert('Image Fetch Error');
              });
        }

        $scope.uploadPic = function (file) {

            file.upload = Upload.upload({
                url: '/api/file/add',
                data: { file: file },
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    $scope.updatePath(response.data.Photo);
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });

        }

        $scope.updatePath = function (photo) {
            var customerid = AuthenticationService.getLoginUserId('cookiecustomer');

            $scope.image.Id = customerid;

            $scope.image.Path = photo.Path;

            $http.post('/api/customer/updatecustomerprofilepic', JSON.stringify($scope.image))
              .success(function (response) {
                  $scope.onInit();
                  $scope.picFile = null;
                  //alert('Path updated Successfully');
              })
              .error(function (response) {
                  alert('Path updated Error');
              });
        }


    }
})();