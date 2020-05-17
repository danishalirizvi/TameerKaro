(function () {
    'use strict';
    angular
        .module('app.customer')
        .service('store', ['$window', function ($window) {
            return {
                get: function (key) {
                    if ($window.localStorage.getItem(key)) {
                        var cart = angular.fromJson($window.localStorage.getItem(key));
                        return JSON.parse(cart);
                    }
                    return false;

                },
                set: function (key, val) {

                    if (val === undefined) {
                        $window.localStorage.removeItem(key);
                    } else {
                        $window.localStorage.setItem(key, angular.toJson(val));
                    }
                    return $window.localStorage.getItem(key);
                }
            }
        }])
})();