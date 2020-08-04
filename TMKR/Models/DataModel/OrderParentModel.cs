using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class OrderParentModel
    {
        public int CART_ID { get; set; }
        
        public double Total { get; set; }

        public string SHPNG_ADRS { get; set; }

        public List<OrderChildModel> orderdetail { get; set; }
    }
}