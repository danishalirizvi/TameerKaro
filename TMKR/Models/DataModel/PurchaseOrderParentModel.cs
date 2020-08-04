using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class PurchaseOrderParentModel
    {
        public int CART_ID { get; set; }

        public string FirstName { get; set; }

        public string Phone { get; set; }

        public double Total { get; set; }

        public string SHPNG_ADRS { get; set; }

        public List<PurchaseOrderChildModel> purchaseorderdetail { get; set; }
    }
}