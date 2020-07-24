(function () {
    'use strict';

    angular.module('app.customer')

        .run(['$rootScope', '$window', 'ngCart', 'ngCartItem', 'store', function ($rootScope, $window, ngCart, ngCartItem, store) {
            $rootScope.$on('ngCart:change', function () {
                ngCart.$save();
            });
            
            if (angular.isObject(store.get('cart'))) {
                ngCart.$restore(store.get('cart'));
                //$window.localStorage.clear();

            } else {
                ngCart.init();
            }

        }])

        .controller('CartController', ['$scope', 'ngCart', '$state', 'productadvts', '$window',
            function ($scope, ngCart, $state, productadvts, $window) {

                $scope.ngCart = ngCart;
                $scope.isLoadingCategories = true;
                $scope.products = [];

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
