using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TMKR.DataAccess;
using TMKR.Models.DataModel;

namespace TMKR.Managers
{
    public class CartManager
    {

        Shopping_CartDao shopping_CartDao = new Shopping_CartDao();
        PurchaseOrderDao purchaseOrderDao = new PurchaseOrderDao();

        public int CreateCart(int userId, int total)
        {
            return shopping_CartDao.createCart(userId, total);
        }

        public void createPurchaseOrders(int cartid, ShoppingCartModel cart)
        {
            List<CartItemModel> items = shopping_CartDao.GetCartItems(cartid);

            List<PurchaseOrder> orders = new List<PurchaseOrder>();
            
            if (items.Any() && cart.user != null)
            {
                 foreach (var item in items)
                {
                    PurchaseOrder po = new PurchaseOrder()
                    {
                        CART_ITEM_ID = item.ID,
                        CSTMR_ID = cart.user.ID,
                        VNDR_ID = item.VNDR_ID,
                        STATUS = "Draft"
                    };

                    if (!string.IsNullOrEmpty(cart.ShippingAddress))
                    {
                        po.SHPNG_ADRS = cart.ShippingAddress;
                    }
                    else
                    {
                        po.SHPNG_ADRS = cart.user.Address;
                    }

                    orders.Add(po);

                }

                purchaseOrderDao.InsertPurchaseOrder(orders);
            }
        }


        public void addCartItems(ShoppingCartModel cart)
        {
            int totalAmount = 0;

            List<CartItemModel> items = new List<CartItemModel>();


            foreach (var item in cart.items)
            {
                var itemAmount = item.Unit_Price * item.Quantity;
                totalAmount += itemAmount;

                CartItemModel cartItem = new CartItemModel();

                cartItem.AMNT = item.Quantity * item.Unit_Price;
                cartItem.PROD_ADVT_ID = item.Advt_Id;
                cartItem.QUNT = item.Quantity;
                cartItem.UNIT_PRCE = item.Unit_Price;
                cartItem.VNDR_ID = item.VNDR_ID;

                items.Add(cartItem);
            }

            int cartid = CreateCart(cart.user.ID, totalAmount);

            items.ForEach(x => { x.CART_ID = cartid; });

            shopping_CartDao.addCartItems(items);

            createPurchaseOrders(cartid, cart);
        }
    }
}