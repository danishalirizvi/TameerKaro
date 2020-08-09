using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TMKR.Models.DataModel
{
    public class RateModel
    {
        public int ID { get; set; }

        public int Prod_Type_ID { get; set; }

        public DateTime EntryDate { get; set; }

        public DateTime ExpiryDate { get; set; }

        public int Rate { get; set; }

        public bool IsActive { get; set; }
    }
}