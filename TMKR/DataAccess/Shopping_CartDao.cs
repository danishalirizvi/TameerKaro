using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using TMKR.Models.DataModel;

namespace TMKR.DataAccess
{
    public class Shopping_CartDao
    {
        private IDbConnection _con;

        public IDbConnection Conn
        {
            get
            {
                return _con = ConnectionFactory.CreateConnection();
            }
        }

        public int createCart(int userId, int total)
        {
            using (Conn)
            {
                string query = "INSERT INTO Shopping_Cart (CSTMR_ID, TOTL_AMNT, IsActive) VALUES (@CSTMR_ID, @TOTL_AMNT, 1) SELECT CAST(SCOPE_IDENTITY() as int)";

                var id = Conn.Query<int>(query, new { CSTMR_ID = userId, TOTL_AMNT = total }).Single();

                return id;
            }
        }

        public void addCartItems(List<CartItemModel> items)
        {
            using (Conn)
            {
                string query = "INSERT INTO Cart_Item(PROD_ADVT_ID,CART_ID,QUNT,UNIT_PRCE,AMNT,VNDR_ID,IsActive) VALUES (@PROD_ADVT_ID,@CART_ID,@QUNT,@UNIT_PRCE,@AMNT,@VNDR_ID,1)";

                Conn.Execute(query, items);
            }
        }

        public List<CartItemModel> GetCartItems(int id)
        {
            using (Conn)
            {
                string query = @"SELECT * from Cart_Item where CART_ID = @CART_ID";

                return Conn.Query<CartItemModel>(query, new { CART_ID = id }).ToList();
            }
        }

        public void suspendOrderCart(int cartId)
        {
            using (Conn)
            {
                string query = @"UPDATE Shopping_Cart SET IsACtive = 0 WHERE ID = @ID";

                Conn.Execute(query, new { ID = cartId });
            }
        }

        public void suspendOrderCartItems(int cartId)
        {
            using (Conn)
            {
                string query = @"update Cart_Item set IsActive = 0 WHERE CART_ID = @CART_ID";

                Conn.Execute(query, new { CART_ID = cartId });
            }
        }

        public void suspendOrderPurchaseOrders(int cartId)
        {
            using (Conn)
            {
                string query = @"update p set p.IsActive = 0 from Purchase_Order p
                                    left join Cart_Item c on c.ID = p.CART_ITEM_ID
                                    WHERE CART_ID = @CART_ID";

                Conn.Execute(query, new { CART_ID = cartId });
            }
        }

        public void resumeOrderCart(int cartId)
        {
            using (Conn)
            {
                string query = @"UPDATE Shopping_Cart SET IsACtive = 1 WHERE ID = @ID";

                Conn.Execute(query, new { ID = cartId });
            }
        }

        public void resumeOrderCartItems(int cartId)
        {
            using (Conn)
            {
                string query = @"update Cart_Item set IsActive = 1 WHERE CART_ID = @CART_ID";

                Conn.Execute(query, new { CART_ID = cartId });
            }
        }

        public void resumeOrderPurchaseOrders(int cartId)
        {
            using (Conn)
            {
                string query = @"update p set p.IsActive = 1 from Purchase_Order p
                                    left join Cart_Item c on c.ID = p.CART_ITEM_ID
                                    WHERE CART_ID = @CART_ID";

                Conn.Execute(query, new { CART_ID = cartId });
            }
        }

        public void suspendSingleOrderCartItems(int orderId)
        {
            using (Conn)
            {
                string query = @"update c set IsActive = 0 from Cart_Item c
                                    left join Purchase_Order p on p.CART_ITEM_ID = c.ID 
                                    WHERE p.ID = @ID";

                Conn.Execute(query, new { ID = orderId });
            }
        }

        public void suspendSingleOrderPurchaseOrders(int orderId)
        {
            using (Conn)
            {
                string query = @"update Purchase_Order set IsActive = 0 where ID = @ID";

                Conn.Execute(query, new { ID = orderId });
            }
        }

        public void resumeSingleOrderCartItems(int orderId)
        {
            using (Conn)
            {
                string query = @"update c set IsActive = 1 from Cart_Item c
                                    left join Purchase_Order p on p.CART_ITEM_ID = c.ID 
                                    WHERE p.ID = @ID";

                Conn.Execute(query, new { ID = orderId });
            }
        }

        public void resumeSingleOrderPurchaseOrders(int orderId)
        {
            using (Conn)
            {
                string query = @"update Purchase_Order set IsActive = 1 where ID = @ID";

                Conn.Execute(query, new { ID = orderId });
            }
        }
    }
}