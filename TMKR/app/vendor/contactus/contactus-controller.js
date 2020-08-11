(function () {
    'use strict';
    angular.module('app.vendor')
      .controller('VendorContactUsController', ['$scope', '$http',
    function ($scope, $http) {

        $scope.content = null;
        $scope.submit = function () {
            $http.post('/api/customer/sendmessage', $scope.content)
            .success(function (response) {
                $scope.content = null;
            })
            .error(function (response) {
                alert('Server not Responding. Try Again Later');
            });
        }

    }]);
})();