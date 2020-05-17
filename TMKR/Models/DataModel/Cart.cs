using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class Cart
    {
        public List<CartItems> items { get; set; }
        public CustomerModel user { get; set; }
        public string ShippingAddress { get; set; }
    }
}