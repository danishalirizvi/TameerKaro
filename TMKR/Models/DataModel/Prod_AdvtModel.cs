using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class Prod_AdvtModel
    {
        public int Advt_Id { get; set; }

        public string Prod_Type { get; set; }

        public string Advt_Dscp { get; set; }

        public int VNDR_ID { get; set; }

        public string VNDR_Name { get; set; }

        public int Unit_Price { get; set; }

        public int Order_Limit { get; set; }

        public bool DLVRY_AVLB { get; set; }

        public int Quantity { get; set; }

        public string IMG_PATH { get; set; }

        public string Unit { get; set; }
    }
}