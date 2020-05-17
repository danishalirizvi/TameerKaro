using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class CartItem
    {
        public int ID { get; set; }
        public int PROD_ADVT_ID { get; set; }
        public int CART_ID { get; set; }
        public int QUNT { get; set; }
        public int UNIT_PRCE { get; set; }
        public int AMNT { get; set; }
        public int VNDR_ID { get; set; }
    }
}