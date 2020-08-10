(function () {
    'use strict';

    angular.module('app.customer')

        .run(['$rootScope', '$state', '$window', '$location', 'ngCart', 'ngCartItem', 'store', function ($rootScope, $state, $window, $location, ngCart, ngCartItem, store) {
            $rootScope.$on('ngCart:change', function () {
                ngCart.$save();
            });

            if (navigator.cookieEnabled) {
                if (angular.isObject(store.get('cart'))) {
                    ngCart.$restore(store.get('cart'));                
                } else {
                    ngCart.initCart();
                }
            } else {
                $location.url('/error');
            }

        }])

        .controller('CartController', ['$scope', 'ngCart', '$state', 'productadvts', '$window',
            function ($scope, ngCart, $state, productadvts, $window) {

                $scope.ngCart = ngCart;
                $scope.isLoadingCategories = true;
                $scope.products = [];

                $scope.oninit = function () {
                    ngCart.initCart();
                };

                $scope.viewProduct = function (advt) {
                    Advertisement.advt = advt;
                    $state.go("vendor.product", {
                        advtId: advt.ID
                    });
                }

                productadvts.GetProdAdvts(function (data) {
                    $scope.isLoadingCategories = false;
                    $scope.products = data;
                }, function (errorMessage) {
                    alert(errorMessage);
                });
            }])
})();
