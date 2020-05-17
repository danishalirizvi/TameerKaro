using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using TMKR.Models.DataModel;

namespace TMKR.DataAccess
{
    public class PurchaseOrderDao
    {
        private IDbConnection _con;
        public IDbConnection Conn
        {
            get
            {
                return _con = ConnectionFactory.CreateConnection();
            }
        }

        public bool UpdateOrderStatus(int id, string status)
        {
            string query = "UPDATE Purchase_Order SET STATUS = @STATUS where ID = @ID";

            Conn.Execute(query, new { STATUS = status, ID = id });
            return true;
        }

        public void InsertPurchaseOrder(List<PurchaseOrder> purchaseOrders)
        {
            string query = "insert into Purchase_Order(CART_ITEM_ID, VNDR_ID, CSTMR_ID, STATUS, SHPNG_ADRS) VALUES (@CART_ITEM_ID, @VNDR_ID, @CSTMR_ID, @STATUS, @SHPNG_ADRS)";

            Conn.Execute(query, purchaseOrders);
        }

        public List<PurchaseOrderParentModel> GetPurchaseOrdersParent(int id)
        {
            using (Conn)
            {
                string query = @"select cs.FRST_NME as FirstName,cs.PHNE as Phone,sum(c.AMNT) as Total, p.STATUS, p.SHPNG_ADRS from Shopping_Cart s
                                left join Cart_Item c on c.CART_ID = s.ID
                                left join Customer cs on s.CSTMR_ID = cs.ID
                                left join Purchase_Order p on p.CART_ITEM_ID = c.ID 
                                where c.VNDR_ID = @VNDR_ID AND STATUS != @STATUS
                                group by s.ID, s.CSTMR_ID,cs.FRST_NME,cs.PHNE,p.STATUS,p.SHPNG_ADRS";

                //return Conn.Query<Purchase_Order>(query).ToList();
                return Conn.Query<PurchaseOrderParentModel>(query, new { VNDR_ID = id, STATUS = "Rejected" }).ToList();
            }
        }

        internal List<PurchaseOrderModel> PurchaseOrderList(int vendorId)
        {
            using (Conn)
            {
                string query = @"SELECT  p.ID as PurchaseOrderId, pt.NME as ProductName, c.QUNT as Quantity, 
                        c.UNIT_PRCE as UnitPrice, cus.FRST_NME as FirstName, cus.PHNE, c.AMNT as ItemAmount, p.STATUS, p.SHPNG_ADRS, 
                        c.CART_ID, cus.ID as CustomerID from Purchase_Order p
                        LEFT JOIN Cart_Item c on p.CART_ITEM_ID = c.ID
                        LEFT JOIN Customer cus on p.CSTMR_ID = cus.ID
                        LEFT JOIN Prod_Advt pa on c.PROD_ADVT_ID = pa.ID
                        LEFT JOIN Product_Type pt on pa.PROD_TYPE_ID = pt.ID 
                        WHERE p.VNDR_ID = @VNDR_ID AND STATUS != @STATUS";
                
                return Conn.Query<PurchaseOrderModel>(query, new { VNDR_ID = vendorId, STATUS = "Rejected" }).ToList();
            }
        }

        public List<PurchaseOrderChildModel> GetPurchaseOrdersChild(int id)
        {
            using (Conn)
            {
                string query = @"select  p.ID, NME as ProdName,QUNT as Quantity,UNIT_PRICE as Unit_Price, AMNT as TotalAmount, STATUS as Status from Purchase_Order p
                                left join Customer on CSTMR_ID = Customer.ID
                                left join Cart_Item on CART_ITEM_ID = Cart_Item.ID
                                left join Prod_Advt on PROD_ADVT_ID = Prod_Advt.ID
                                left join Product_Type on PROD_TYPE_ID = Product_Type.ID
                                where p.VNDR_ID = @VNDR_ID AND STATUS != @STATUS";

                //return Conn.Query<Purchase_Order>(query).ToList();
                return Conn.Query<PurchaseOrderChildModel>(query, new { VNDR_ID = id, STATUS = "Rejected" }).ToList();
            }
        }
    }
}