using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class CartItemsModel
    {
        public int Advt_Id { get; set; }
        public int Quantity { get; set; }
        public int Unit_Price { get; set; }
        public int VNDR_ID { get; set; }
    }
}