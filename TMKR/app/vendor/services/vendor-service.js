(function () {
    'use strict';

    angular
        .module('app.vendor')
        .service('VendorService', VendorService);

    VendorService.$inject = ['$http', 'API_URL'];

    function VendorService($http, API_URL) {
        var serviceurl = API_URL + '/vendor/getProdTypes';
        var createAdvtURL = API_URL + '/vendor/createAdvt';
        //var purchaseOrdersURL = API_URL + '/vendor/getPurchaseOrders';
        var advtStatusURL = API_URL + '/vendor/getAdvtStatus';
        var updateAdvtURL = API_URL + '/vendor/updateAdvt';
        

        this.getProductTypes = function (successCallback, errorCallback) {
            $http.get(serviceurl)
              .success(function (response) {
                  if (typeof successCallback === 'function') {
                      successCallback(response);
                  }
              })
              .error(function (response) {
                  if (typeof errorCallback === 'function') {
                      //removeHttpHeader();
                      errorCallback(response);
                  }
              });
        };

        this.getAdvtStatus = function (successCallback, errorCallback) {
            $http.get(advtStatusURL)
              .success(function (response) {
                  if (typeof successCallback === 'function') {
                      successCallback(response);
                  }
              })
              .error(function (response) {
                  if (typeof errorCallback === 'function') {
                      //removeHttpHeader();
                      errorCallback(response);
                  }
              });
        };

        this.getPurchaseOrders = function (vndrId, success, error) {
            var config = {
                method: 'GET',
                url:  API_URL + '/vendor/' + vndrId + '/getPurchaseOrders'               
                //params: { vndrId: vndrId }
            };

            $http(config)
              .success(function (response) {
                  if (typeof success === 'function') {
                      
                      success(response);
                  }
              })
              .error(function (response) {
                  if (typeof errerrororCallback === 'function') {
                      //removeHttpHeader();
                      error(response);
                  }
              });
        };

        this.createAdvt = function (advt, successCase, errorCase) {
            $http.post(createAdvtURL, JSON.stringify(advt))
              .success(function (response) {
                  if (typeof successCase === 'function') {
                      successCase(response);
                  }
              })
              .error(function (response) {
                  if (typeof errorCase === 'function') {
                      errorCase(response);
                  }
              });
        };

        this.updateAdvt = function (advt, successCase, errorCase) {
            $http.post(updateAdvtURL, JSON.stringify(advt))
              .success(function (response) {
                  if (typeof successCase === 'function') {
                      successCase(response);
                  }
              })
              .error(function (response) {
                  if (typeof errorCase === 'function') {
                      errorCase(response);
                  }
              });
        };


    }
})();