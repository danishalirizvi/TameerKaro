(function () {
    'use strict';

    angular
        .module('app.customer')
        .service('ngCart', ['$rootScope', '$window', 'ngCartItem', 'store', '$cookies', '$http',
            function ($rootScope, $window, ngCartItem, store, $cookies, $http) {

                this.init = function () {
                    this.$cart = {
                        shipping: null,
                        taxRate: null,
                        tax: null,
                        items: [],
                        user: {},
                        ShippingAddress: null
                    };
                    this.$cart.user = this.retrieveCredentials();
                };

                this.retrieveCredentials = function () {
                    var credentials = $cookies.getObject('authentication-credentials');

                    return credentials === undefined ? null : credentials.user;
                };

                this.checkout = function (addressNew) {
                    alert(addressNew);
                    this.$cart.ShippingAddress = addressNew;
                    $http.post('/api/customer/savecart', JSON.stringify(this.$cart))
                    .success(function (response) {
                        alert('Success');
                        //$state.go('login');
                    })
                    .error(function (response) {
                        alert('Failure');
                        //$state.go('home');
                    });
                };

                this.addItem = function (product) {
                    var inCart = this.getItemById(product.Advt_Id);
                    if (typeof inCart === 'object') {
                        if (!(product.Quantity) || !(product.Unit_Price)) { alert("Enter Product Quantity or Unit Price Not Available"); return; }
                        inCart.setQuantity(product.Quantity, false);
                        $rootScope.$broadcast('ngCart:itemUpdated', inCart);
                    } else {
                        var prod = JSON.stringify(product);
                        if (!(product.Quantity) || !(product.Unit_Price)) { alert("Enter Product Quantity or Unit Price Not Available"); return; }
                        var newItem = new ngCartItem(product.Advt_Id, product.Prod_Type, product.Unit_Price, product.Quantity, product.VNDR_ID, prod);
                        this.$cart.items.push(newItem);
                        $rootScope.$broadcast('ngCart:itemAdded', newItem);
                    }
                    $rootScope.$broadcast('ngCart:change', {});
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
                    this.init();
                    $window.localStorage.clear();
                }

                this.setCart = function (cart) {
                    this.$cart = cart;
                    return this.getCart();
                };

                this.getCart = function () {
                    var storedItems = $window.localStorage.getItem('cart');
                    if (!storedItems) {
                        this.init();
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
                    _self.init();
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

            }])
})();