(function () {
    'use strict';
    angular
        .module('app.customer')
        .factory('ngCartItem', ['$rootScope', '$log', function ($rootScope, $log) {

            var item = function (id, name, price, quantity, vendorId, data) {
                this.setId(id);
                this.setName(name);
                this.setPrice(price);
                this.setQuantity(quantity);
                this.setvendorId(vendorId);
                this.setData(data);
            };

            item.prototype.setvendorId = function (vendorId) {
                if (vendorId) this.VNDR_ID = vendorId;
                else {
                    $log.error('An vendorId must be provided');
                }
            };

            item.prototype.setId = function (id) {
                if (id) this.Advt_Id = id;
                else {
                    $log.error('An ID must be provided');
                }
            };

            item.prototype.getId = function () {
                return this.Advt_Id;
            };

            item.prototype.setName = function (name) {
                if (name) this.Prod_Type = name;
                else {
                    $log.error('A name must be provided');
                }
            };
            
            item.prototype.getName = function () {
                return this.Prod_Type;
            };

            item.prototype.setPrice = function (price) {
                var priceFloat = parseFloat(price);
                if (priceFloat) {
                    if (priceFloat <= 0) {
                        $log.error('A price must be over 0');
                    } else {
                        this.Unit_Price = (priceFloat);
                    }
                } else {
                    $log.error('A price must be provided');
                }
            };
   
            item.prototype.getPrice = function () {
                return this.Unit_Price;
            };

            item.prototype.setQuantity = function (quantity, relative) {
                var quantityInt = parseInt(quantity);
                if (quantityInt % 1 === 0) {
                    if (relative === true) {
                        this.Quantity += quantityInt;
                    } else {
                        this.Quantity = quantityInt;
                    }
                    if (this.Quantity < 1) this.Quantity = 1;

                } else {
                    this.Quantity = 1;
                    $log.info('Quantity must be an integer and was defaulted to 1');
                }


            };

            item.prototype.getQuantity = function () {
                return this.Quantity;
            };

            item.prototype.setData = function (data) {
                if (data) this._data = data;
            };

            item.prototype.getData = function () {
                if (this._data) return this._data;
                else $log.info('This item has no data');
            };

            item.prototype.getTotal = function () {
                return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
            };

            item.prototype.toObject = function () {
                return {
                    id: this.getId(),
                    name: this.getName(),
                    price: this.getPrice(),
                    quantity: this.getQuantity(),
                    data: this.getData(),
                    total: this.getTotal()
                }
            };

            return item;

        }])
})();