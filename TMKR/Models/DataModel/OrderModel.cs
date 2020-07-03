using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class OrderModel
    {
        public int PurchaseOrderId { get; set; }
        public string Product { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public string VendorName { get; set; }
        public long VendorPhone { get; set; }
        public double ItemAmount { get; set; }
        public string STATUS { get; set; }
        public string SHPNG_ADRS { get; set; }
        public int CART_ID { get; set; }
        public int VendorId { get; set; }
        public string VendorEmail { get; set; }
    }
}