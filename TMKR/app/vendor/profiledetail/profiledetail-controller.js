(function () {
    'use strict';
    angular
        .module('app.vendor')
        .controller('VendorProfileDetailController', VendorProfileDetailController);

    VendorProfileDetailController.$inject = ['$scope', '$state', 'AuthenticationService', '$http', 'Upload', '$timeout'];

    function VendorProfileDetailController($scope, $state, AuthenticationService, $http, Upload, $timeout) {

        $scope.user = AuthenticationService.getUserObject('cookievendor');

        $scope.image = { Id: null, Path: null };

        $scope.picpath = null;

        $scope.editprofile = function () {
            $state.go("vendor.profile");
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

        $scope.onInit = function () {
            var vendorid = AuthenticationService.getLoginUserId('cookievendor');
            var config = {
                method: 'GET',
                url: '/api/vendor/getVendorProfilePicPath/' + vendorid
            };
            $http(config)
              .success(function (response) {
                  $scope.picpath = response;
              })
              .error(function (response) {
                  alert('Image Fetch Error');
              });
        }

        $scope.updatePath = function (photo) {
            var venderid = AuthenticationService.getLoginUserId('cookievendor');

            $scope.image.Id = venderid;

            $scope.image.Path = photo.Path;

            $http.post('/api/vendor/updatevendorprofilepic', JSON.stringify($scope.image))
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