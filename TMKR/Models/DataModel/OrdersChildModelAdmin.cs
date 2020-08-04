using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class OrdersChildModelAdmin
    {
        public int ID { get; set; }

        public string ProdName { get; set; }

        public int Quantity { get; set; }

        public double Unit_Price { get; set; }

        public double TotalAmount { get; set; }

        public string Status { get; set; }

        public string Unit { get; set; }

        public int VendorId { get; set; }

        public string VendorName { get; set; }

        public string VendorPhone { get; set; }

        public string STATUS { get; set; }

        public bool PActive { get; set; }

        public bool CIActive { get; set; }
    }
}