using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class PurchaseOrder
    {
        public int ID { get; set; }

        public int? CART_ITEM_ID { get; set; }

        public int? VNDR_ID { get; set; }

        public int? CSTMR_ID { get; set; }

        public string STATUS { get; set; }

        public string SHPNG_ADRS { get; set; }
    }
}