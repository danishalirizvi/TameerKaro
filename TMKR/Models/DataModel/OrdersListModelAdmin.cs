using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class OrdersListModelAdmin
    {
        public int PurchaseOrderId { get; set; }
        public string ProductName { get; set; }
        public string Unit { get; set; }
        public int Quantity { get; set; }
        public int UnitPrice { get; set; }
        public int CustomerId { get; set; }
        public string Customer { get; set; }
        public string CustomerPhone { get; set; }
        public int ItemAmount { get; set; }
        public string STATUS { get; set; }
        public string SHPNG_ADRS { get; set; }
        public int CART_ID { get; set; }
        public int VendorId { get; set; }
        public string VendorName { get; set; }
        public string VendorPhone { get; set; }
        public bool PActive { get; set; }
        public bool CIActive { get; set; }

    }
}