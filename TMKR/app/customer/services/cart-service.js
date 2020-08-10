(function () {
    'use strict';

    angular
        .module('app.customer')
        .service('ngCart', ['$rootScope', '$window', 'ngCartItem', 'store', '$cookies', '$http', '$state', '$modal',
            function ($rootScope, $window, ngCartItem, store, $cookies, $http, $state, $modal) {

                this.initCart = function () {
                    this.$cart = {
                        items: [],
                        user: {},
                        ShippingAddress: null
                    };
                    this.$cart.user = this.retrieveCredential();
                };

                this.initCartPartially = function () {
                    this.$cart = {
                        user: {},
                        ShippingAddress: null
                    };
                    this.$cart.user = this.retrieveCredential();
                };

                this.retrieveCredential = function () {
                    var credentials = $cookies.getObject('cookiecustomer');

                    return credentials === undefined ? null : credentials.user;
                };

                this.checkout = function (addressNew) {
                    this.$cart.ShippingAddress = addressNew;
                    $http.post('/api/customer/savecart', JSON.stringify(this.$cart))
                    .success(function (response) {
                        $window.localStorage.removeItem('cart');
                        $rootScope.$broadcast('ngCart:checkout', {});
                        $modal.open({
                            templateUrl: 'app/customer/cartdetail/success-alert.html',
                            controller: function ($scope, $modalInstance) {
                                $scope.submit = function () {
                                    $log.log('Submiting user info.');
                                    $log.log($scope.selected);
                                    $modalInstance.dismiss('cancel');
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            resolve: {
                                //user: function () {
                                //    return $scope.selected;
                                //}
                            }
                        });
                        $state.go('customer.shopping');
                    })
                    .error(function (response) {
                        //$state.go('home');
                    });
                };

                this.MissingPopup = function (errorMessage) {
                    $modal.open({
                        templateUrl: 'app/customer/cart/error-alert.html',
                        controller: function ($scope, $modalInstance) {
                            $scope.message = errorMessage;
                            $scope.submit = function () {
                                $modalInstance.dismiss('cancel');
                            }
                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                        }
                    });
                };

                this.addItem = function (product) {
                    if (product.Quantity <= 0 || product.Quantity == null || product.Quantity == undefined) {
                        this.MissingPopup('Product Quantity must be Positive');
                    } else if (product.Quantity > product.Order_Limit) {
                        this.MissingPopup('Max Limit for Order Placement is ' + product.Order_Limit);
                    } else {
                        var inCart = this.getItemById(product.Advt_Id);
                        if (typeof inCart === 'object') {
                            if (!(product.Quantity) || !(product.Unit_Price)) { alert("Enter Product Quantity or Unit Price Not Available"); return; }
                            inCart.setQuantity(product.Quantity, false);
                            $rootScope.$broadcast('ngCart:itemUpdated', inCart);
                        } else {
                            var prod = JSON.stringify(product);
                            if (!(product.Quantity) || !(product.Unit_Price)) { alert("Enter Product Quantity or Unit Price Not Available"); return; }
                            var newItem = new ngCartItem(product.Advt_Id, product.Prod_Type, product.Unit_Price, product.Quantity, product.VNDR_ID, prod);

                            if (this.$cart.items.length === 0) {
                                this.$cart.items.push(newItem)
                                this.$saveDefault(this.$cart);
                            }
                            else {
                                this.$cart.items.push(newItem);
                            }

                            $rootScope.$broadcast('ngCart:itemAdded', newItem);
                        }
                    }
                    $rootScope.$broadcast('ngCart:change', {});
                    product.Quantity = null;
                };

                this.getItemById = function (itemId) {
                    var items = this.getCart().items;
                    var build = false;

                    angular.forEach(items, function (item) {
                        if (item.getId() === itemId) {
                            build = item;
                        }
                    });
                    return build;
                };

                this.getCost = function (item) {
                    return item.Quantity * item.Unit_Price;
                };

                this.ClearCart = function () {
                    this.initCart();
                    $window.localStorage.clear();
                }

                this.setCart = function (cart) {
                    this.$cart = cart;
                    return this.getCart();
                };

                this.getCount = function () {
                    var storedItems = this.getCart().items;

                    if (!storedItems) {
                        return 0;
                    }
                    else
                        return storedItems.length;
                }

                this.getCart = function () {
                    var storedItems = $window.localStorage.getItem('cart');
                    if (!storedItems) {
                        this.initCart();
                        return this.$cart;
                    }
                    else
                        return this.$cart;
                };

                this.getItems = function () {
                    return this.getCart().items;
                };

                this.getTotalItems = function () {
                    var count = 0;
                    var items = this.getItems();
                    angular.forEach(items, function (item) {
                        count += item.getQuantity();
                    });
                    return count;
                };

                this.getTotalUniqueItems = function () {
                    return this.getCart().items.length;
                };

                this.getSubTotal = function () {
                    var total = 0;
                    angular.forEach(this.getCart().items, function (item) {
                        total += item.getTotal();
                    });
                    return +parseFloat(total).toFixed(2);
                };

                this.totalCost = function () {
                    return +parseFloat(this.getSubTotal()).toFixed(2);
                };

                this.removeItem = function (index) {
                    var item = this.$cart.items.splice(index, 1)[0] || {};
                    $rootScope.$broadcast('ngCart:itemRemoved', item);
                    $rootScope.$broadcast('ngCart:change', {});

                };

                this.removeItemById = function (id) {
                    var item;
                    var cart = this.getCart();
                    angular.forEach(cart.items, function (item, index) {
                        if (item.getId() === id) {
                            item = cart.items.splice(index, 1)[0] || {};
                        }
                    });
                    this.setCart(cart);
                    $rootScope.$broadcast('ngCart:itemRemoved', item);
                    $rootScope.$broadcast('ngCart:change', {});
                };

                this.empty = function () {
                    $rootScope.$broadcast('ngCart:change', {});
                    this.$cart.items = [];
                    $window.localStorage.removeItem('cart');
                };

                this.isEmpty = function () {
                    return (this.$cart.items.length > 0 ? false : true);
                };

                this.$restore = function (storedCart) {
                    var _self = this;
                    _self.initCart();
                    _self.$cart.shipping = storedCart.shipping;
                    _self.$cart.tax = storedCart.tax;

                    angular.forEach(storedCart.items, function (item) {
                        //_self.$cart.items.push(new ngCartItem(item));
                        //$window.localStorage.clear();
                        var cartItem = new ngCartItem(item.Advt_Id, item.Prod_Type, item.Unit_Price, item.Quantity, item.VNDR_ID, item._data);
                        //alert(JSON.stringify(cartItem));
                        _self.$cart.items.push(cartItem);
                    });
                    // this.$save();
                };

                this.$save = function () {
                    return store.set('cart', JSON.stringify(this.getCart()));
                }

                this.$saveDefault = function (cart) {
                    return store.set('cart', JSON.stringify(cart));
                }

            }])
})();