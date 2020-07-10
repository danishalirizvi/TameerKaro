using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class PurchaseOrderModel
    {
        public int PurchaseOrderId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public string FirstName { get; set; }
        public long PHNE { get; set; }
        public double ItemAmount { get; set; }
        public string STATUS { get; set; }
        public string SHPNG_ADRS { get; set; }
        public int CART_ID { get; set; }
        public int CustomerID { get; set; }
        public string Unit { get; set; }
    }
}