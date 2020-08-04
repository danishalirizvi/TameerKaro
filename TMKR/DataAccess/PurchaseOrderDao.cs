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
            string query = "UPDATE Purchase_Order SET STATUS = @STATUS where ID = @ID AND IsActive = 'True'";

            Conn.Execute(query, new { STATUS = status, ID = id });
            return true;
        }

        public void InsertPurchaseOrder(List<PurchaseOrder> purchaseOrders)
        {
            string query = "insert into Purchase_Order(CART_ITEM_ID, VNDR_ID, CSTMR_ID, STATUS, SHPNG_ADRS, IsActive) VALUES (@CART_ITEM_ID, @VNDR_ID, @CSTMR_ID, @STATUS, @SHPNG_ADRS, 1)";

            Conn.Execute(query, purchaseOrders);
        }

        //public List<PurchaseOrderParentModel> GetPurchaseOrdersParent(int id)
        //{
        //    using (Conn)
        //    {
        //        string query = @"select cs.FRST_NME as FirstName,cs.PHNE as Phone,sum(c.AMNT) as Total, p.STATUS, p.SHPNG_ADRS from Shopping_Cart s
        //                        left join Cart_Item c on c.CART_ID = s.ID
        //                        left join Customer cs on s.CSTMR_ID = cs.ID
        //                        left join Purchase_Order p on p.CART_ITEM_ID = c.ID 
        //                        where c.VNDR_ID = @VNDR_ID AND STATUS != @STATUS AND IsCanceled = 0 AND s.IsActive = 'True'
        //                        group by s.ID, s.CSTMR_ID,cs.FRST_NME,cs.PHNE,p.STATUS,p.SHPNG_ADRS";

        //        //return Conn.Query<Purchase_Order>(query).ToList();
        //        return Conn.Query<PurchaseOrderParentModel>(query, new { VNDR_ID = id, STATUS = "Rejected" }).ToList();
        //    }
        //}

        public void UpdateOrderStatus(ActionDataModel data)
        {
            string query = @"update Purchase_Order set STATUS = @STATUS
                            from Purchase_Order p
                            left join Cart_Item c on c.ID = p.ID
                            left join Shopping_Cart s on s.ID = c.CART_ID
                            where s.ID = @ID AND p.STATUS != 'Accepted' AND  p.STATUS != 'Rejected'";

            Conn.Execute(query, new { STATUS = data.action, ID = data.id });
        }

        public List<PurchaseOrderModel> PurchaseOrderList(int vendorId, string type)
        {
            using (Conn)
            {
                string query = null;
                if (type == "New")
                {
                    query = @"SELECT  p.ID as PurchaseOrderId, pt.NME as ProductName, pt.Unit, c.QUNT as Quantity, 
                        c.UNIT_PRCE as UnitPrice, cus.FRST_NME as FirstName, cus.PHNE, c.AMNT as ItemAmount, p.STATUS, p.SHPNG_ADRS, 
                        c.CART_ID, cus.ID as CustomerID from Purchase_Order p
                        LEFT JOIN Cart_Item c on p.CART_ITEM_ID = c.ID
                        LEFT JOIN Customer cus on p.CSTMR_ID = cus.ID
                        LEFT JOIN Prod_Advt pa on c.PROD_ADVT_ID = pa.ID
                        LEFT JOIN Product_Type pt on pa.PROD_TYPE_ID = pt.ID 
						LEFT JOIN Shopping_Cart sc on sc.ID = c.CART_ID 
                        WHERE p.VNDR_ID = @VNDR_ID AND STATUS != @STATUS AND STATUS != @STATUS1 AND STATUS != 'Canceled' AND p.IsActive = 1";

                    return Conn.Query<PurchaseOrderModel>(query, new { VNDR_ID = vendorId, STATUS = "Rejected", STATUS1 = "Accepted" }).ToList();
                }
                else if (type == "Accepted")
                {
                    query = @"SELECT  p.ID as PurchaseOrderId, pt.NME as ProductName, pt.Unit, c.QUNT as Quantity, 
                        c.UNIT_PRCE as UnitPrice, cus.FRST_NME as FirstName, cus.PHNE, c.AMNT as ItemAmount, p.STATUS, p.SHPNG_ADRS, 
                        c.CART_ID, cus.ID as CustomerID from Purchase_Order p
                        LEFT JOIN Cart_Item c on p.CART_ITEM_ID = c.ID
                        LEFT JOIN Customer cus on p.CSTMR_ID = cus.ID
                        LEFT JOIN Prod_Advt pa on c.PROD_ADVT_ID = pa.ID
                        LEFT JOIN Product_Type pt on pa.PROD_TYPE_ID = pt.ID 
						LEFT JOIN Shopping_Cart sc on sc.ID = c.CART_ID 
                        WHERE p.VNDR_ID = @VNDR_ID AND STATUS = @STATUS AND STATUS != 'Canceled' AND p.IsActive = 1";

                    return Conn.Query<PurchaseOrderModel>(query, new { VNDR_ID = vendorId, STATUS = "Accepted" }).ToList();
                }
                else if (type == "Rejected")
                {
                    query = @"SELECT  p.ID as PurchaseOrderId, pt.NME as ProductName, pt.Unit, c.QUNT as Quantity, 
                        c.UNIT_PRCE as UnitPrice, cus.FRST_NME as FirstName, cus.PHNE, c.AMNT as ItemAmount, p.STATUS, p.SHPNG_ADRS, 
                        c.CART_ID, cus.ID as CustomerID from Purchase_Order p
                        LEFT JOIN Cart_Item c on p.CART_ITEM_ID = c.ID
                        LEFT JOIN Customer cus on p.CSTMR_ID = cus.ID
                        LEFT JOIN Prod_Advt pa on c.PROD_ADVT_ID = pa.ID
                        LEFT JOIN Product_Type pt on pa.PROD_TYPE_ID = pt.ID 
                        WHERE p.VNDR_ID = @VNDR_ID AND STATUS = @STATUS AND p.IsActive = 'True'";

                    return Conn.Query<PurchaseOrderModel>(query, new { VNDR_ID = vendorId, STATUS = "Rejected" }).ToList();
                }
                else
                {
                    return null;
                }
            }
        }

        public List<OrdersListModelAdmin> getOrdersListAdmin()
        {
            using (Conn)
            {
                string query = @"SELECT p.ID as PurchaseOrderId, pt.NME as ProductName, pt.Unit, c.QUNT as Quantity, c.UNIT_PRCE as UnitPrice, 
                                    cus.ID as CustomerId, cus.FRST_NME as Customer, cus.PHNE as CustomerPhone, c.AMNT as ItemAmount, p.STATUS, 
                                    p.SHPNG_ADRS,c.CART_ID,p.VNDR_ID as VendorId,v.FRST_NME as VendorName,v.PHNE as VendorPhone,
                                    p.IsActive as PActive, c.IsActive as CIActive from Purchase_Order p
                                    LEFT JOIN Cart_Item c on p.CART_ITEM_ID = c.ID
                                    LEFT JOIN Customer cus on p.CSTMR_ID = cus.ID
                                    LEFT JOIN Prod_Advt pa on c.PROD_ADVT_ID = pa.ID
                                    LEFT JOIN Product_Type pt on pa.PROD_TYPE_ID = pt.ID
                                    LEFT JOIN Vendor v on p.VNDR_ID = v.ID
                                    LEFT JOIN Shopping_Cart sc on sc.ID = c.CART_ID";

                return Conn.Query<OrdersListModelAdmin>(query).ToList();
            }
        }

        //***
        public List<OrderModel> OrderList(int Id, string type)
        {
            using (Conn)
            {
                if (type == "Pending")
                {
                    string query = @"SELECT p.ID as PurchaseOrderID, pt.NME as Product, c.QUNT as Quantity, 
						c.UNIT_PRCE as UnitPrice, c.AMNT as ItemAmount, p.STATUS, p.SHPNG_ADRS, 
                        c.CART_ID,v.FRST_NME as VendorName, v.ID as VendorId, v.PHNE as VendorPhone, v.EMAIL as VendorEmail from Purchase_Order p
                        LEFT JOIN Cart_Item c on p.CART_ITEM_ID = c.ID
                        LEFT JOIN Customer cus on p.CSTMR_ID = cus.ID
                        LEFT JOIN Prod_Advt pa on c.PROD_ADVT_ID = pa.ID
                        LEFT JOIN Product_Type pt on pa.PROD_TYPE_ID = pt.ID
						LEFT JOIN Vendor v on v.ID = p.VNDR_ID
						LEFT JOIN Shopping_Cart sc on sc.ID = c.CART_ID
                        WHERE p.CSTMR_ID = @CSTMR_ID AND STATUS != 'Canceled' AND p.IsActive = 1 AND (STATUS = @STATUS OR STATUS = 'Draft')";

                    return Conn.Query<OrderModel>(query, new { CSTMR_ID = Id, STATUS = type }).ToList();
                }
                else
                {
                    string query = @"SELECT p.ID as PurchaseOrderID, pt.NME as Product, c.QUNT as Quantity, 
						c.UNIT_PRCE as UnitPrice, c.AMNT as ItemAmount, p.STATUS, p.SHPNG_ADRS, 
                        c.CART_ID,v.FRST_NME as VendorName, v.ID as VendorId, v.PHNE as VendorPhone, v.EMAIL as VendorEmail from Purchase_Order p
                        LEFT JOIN Cart_Item c on p.CART_ITEM_ID = c.ID
                        LEFT JOIN Customer cus on p.CSTMR_ID = cus.ID
                        LEFT JOIN Prod_Advt pa on c.PROD_ADVT_ID = pa.ID
                        LEFT JOIN Product_Type pt on pa.PROD_TYPE_ID = pt.ID
						LEFT JOIN Vendor v on v.ID = p.VNDR_ID
						LEFT JOIN Shopping_Cart sc on sc.ID = c.CART_ID
                        WHERE p.CSTMR_ID = @CSTMR_ID  AND STATUS != 'Canceled' AND STATUS = @STATUS AND p.IsActive = 'True'";

                    return Conn.Query<OrderModel>(query, new { CSTMR_ID = Id, STATUS = type }).ToList();
                }


            }
        }

        public void UpdateSingleOrderStatus(ActionDataModel data)
        {
            string query = @"update Purchase_Order set STATUS = @STATUS where ID = @ID";

            Conn.Execute(query, new { STATUS = data.action, ID = data.id });
        }

        public void CancelOrderItem(int itemId)
        {
            string query = @"update Purchase_Order set STATUS = 'Canceled' where ID = @ID";

            Conn.Execute(query, new { ID = itemId });
        }

        public void CancelOrder(int cartId)
        {
            string query = @"update p set p.STATUS = 'Canceled' from Purchase_Order p
                                left join Cart_Item c on c.ID = p.CART_ITEM_ID
                                left join Shopping_Cart sc on sc.ID = c.CART_ID
                                where sc.ID = @ID";

            Conn.Execute(query, new { ID = cartId });
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
                                where p.VNDR_ID = @VNDR_ID AND STATUS != @STATUS AND IsCancelled = 0 AND IsActive = 'True'";

                //return Conn.Query<Purchase_Order>(query).ToList();
                return Conn.Query<PurchaseOrderChildModel>(query, new { VNDR_ID = id, STATUS = "Rejected" }).ToList();
            }
        }
    }
}