using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class OrdersParentModelAdmin
    {
        public int CART_ID { get; set; }

        public int CustomerId { get; set; }

        public string Customer { get; set; }

        public string CustomerPhone { get; set; }

        public double Total { get; set; }

        public string SHPNG_ADRS { get; set; }

        public List<OrdersChildModelAdmin> purchaseorderdetail { get; set; }
    }
}