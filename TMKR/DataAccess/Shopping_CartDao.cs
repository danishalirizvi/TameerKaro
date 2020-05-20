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
                string query = "INSERT INTO Shopping_Cart (CSTMR_ID, TOTL_AMNT) VALUES (@CSTMR_ID, @TOTL_AMNT) SELECT CAST(SCOPE_IDENTITY() as int)";

                var id = Conn.Query<int>(query, new { CSTMR_ID = userId, TOTL_AMNT = total }).Single();

                return id;
            }
        }

        public void addCartItems(List<CartItemModel> items)
        {
            using (Conn)
            {
                string query = "INSERT INTO Cart_Item(PROD_ADVT_ID,CART_ID,QUNT,UNIT_PRCE,AMNT,VNDR_ID) VALUES (@PROD_ADVT_ID,@CART_ID,@QUNT,@UNIT_PRCE,@AMNT,@VNDR_ID)";

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
    }
}