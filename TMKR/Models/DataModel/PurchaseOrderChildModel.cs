using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class PurchaseOrderChildModel
    {
        public int ID { get; set; }

        public string ProdName { get; set; }

        public int Quantity { get; set; }

        public double Unit_Price { get; set; }

        public double TotalAmount { get; set; }

        public string Status { get; set; }

        public string Unit { get; set; }
    }
}