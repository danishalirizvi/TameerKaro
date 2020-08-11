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
                $scope.products = [];


                $scope.search = function (item) {
                    if ($scope.searchText === undefined) {
                        return true;
                    } else {
                        var productType = item.Prod_Type.toLocaleLowerCase();
                        var vendorName = item.VNDR_Name.toLocaleLowerCase();
                        var city = item.City.toLocaleLowerCase();

                        var searchText = $scope.searchText.toLocaleLowerCase();

                        if (productType.indexOf(searchText) != -1 || vendorName.indexOf(searchText) != -1 || city.indexOf(searchText) != -1) {
                            return true;
                        }
                    }
                    return false;
                }


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
