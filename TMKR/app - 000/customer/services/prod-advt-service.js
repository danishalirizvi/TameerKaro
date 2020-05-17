(function () {
    //'use strict';

    angular
        .module('app.customer')
        .service('productadvts', productadvts);

    productadvts.$inject = ['$http', 'API_URL'];

    function productadvts($http, API_URL) {
        var sv = this;
        var serviceurl = API_URL + '/customer/placeorder';

        sv.GetProdAdvts = function (onSuccess, onFail) {
            var config = {
                method: 'GET',
                url: serviceurl
            };
            $http(config)
                .then(function (response) {
                    onSuccess(response.data);
                }, function (response) {
                    onFail(response.statusText);
                });
        };
    }
})();