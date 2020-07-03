(function () {

    "use strict";

    angular
      .module("app.customer")
      .controller("HomeCtrl", ["$window",
        "fileService", "Upload", "$scope", function ($window, fileService, Upload, $scope) {

            var apiUrl = '/api/file/add';

            var vm = this;

            //Variables
            vm.photos = [];
            vm.files = [];
            vm.previewPhoto = null;
            vm.spinner = {
                active: true
            };

            //Functions
            vm.setPreviewPhoto = function setPreviewPhoto(photo) {
                vm.previewPhoto = photo;
            }

            function activate() {
                vm.spinner.active = true;
                fileService.getAll()
                  .then(function (data) {
                      vm.photos = data.data.Photos;
                      vm.spinner.active = false;
                      setPreviewPhoto();
                  }, function (err) {
                      console.log("Error status: " + err.status);
                      vm.spinner.active = false;
                  });
            }

            vm.uploadFiles = function uploadFiles(files) {
                vm.spinner.active = true;
                Upload.upload({
                    url: apiUrl,
                    data: { file: files }
                })
                  .then(function (response) {
                      //activate();
                      vm.setPreviewPhoto();
                      vm.spinner.active = false;
                  }, function (err) {
                      console.log("Error status: " + err.status);
                      vm.spinner.active = false;
                  });


            }

            vm.remove = function removePhoto(photo) {
                fileService.deletePhoto(photo.Name)
                  .then(function () {
                      activate();

                      setPreviewPhoto();
                  });
            }

            $scope.SelectFile = function (e) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $scope.PreviewImage = e.target.result;
                    $scope.$apply();
                };
                reader.readAsDataURL(e.target.files[0]);
            }

            //Set scope 
            // activate();
            //vm.uploadFiles = uploadFiles;
            //vm.remove = removePhoto;
            //vm.setPreviewPhoto = setPreviewPhoto;
        }
      ]);
})();
