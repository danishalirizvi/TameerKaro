(function () {
    'use strict';
    angular.module('app.vendor')
      .controller('VendorContactUsController', ['$scope', '$http',
    function ($scope, $http) {

        $scope.content = null;
        $scope.submit = function () {
            $http.post('/api/customer/sendmessage', $scope.content)
            .success(function (response) {
                alert('Success');
                $scope.content = null;
            })
            .error(function (response) {
                alert('Sorry there is some issue !! Please try again ..');
            });
        }

    }]);
})();